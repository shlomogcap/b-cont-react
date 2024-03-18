import { IAccountDoc } from '@/lib/consts/accounts/AccountDoc';
import { ContractConfirms } from '../ContractConfirms';
import { IContractActualsProps } from './ContractActuals.types';
import { ChatCard } from '@/lib/components/commons/ChatCard';
import { ReportTable } from '@/lib/components/ReportTable';
import { StyledRow } from './ContractActuals.styled';
import { columns } from './ContractActuals.consts';
import { prepareContractActualsReport } from './ContractActuals.utils';
import { useContractContext } from '@/lib/context/contractContext';
import { EAccountFields } from '@/lib/consts/accounts/AccountFields';
import { ECommonFields } from '@/lib/consts/commonFields';
import { Button } from '@/lib/components/commons/Button';
import { useModalContext } from '@/lib/context/ModalProvider/ModalProvider';
import { EModalName } from '@/lib/context/ModalProvider/ModalName';
import { EPeriodUnit } from '@/lib/consts/accounts/PeriodUnit';
import { useProjectConfirmsSettingsContext } from '@/lib/context/projectConfirmsSettingsContext';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, firestore } from '@/lib/firebase';
import { EConfirmStatus } from '@/lib/consts/confirms/ConfirmStatus';
import { EConfirmFields } from '@/lib/consts/confirms/ConfirmFields';
import dayjs from 'dayjs';
import { EConfirmFlowControls } from '@/lib/consts/confirms/ConfirmFlowControls';
import {
  EContractFields,
  EContractStage,
  EContractStatus,
} from '@/lib/consts/contracts';
import { showToastError } from '@/lib/utils/showToastError';
import { useRouter } from 'next/router';
import {
  CONTRACT_STAGE_QUERY,
  ERoutesNames,
  SECTION_ID_QUERY,
} from '@/lib/consts/routes';

//TODO: DISPLAY_TEXTS
const CHAT_TITLE = 'לוג הערות לחוזה';
const REPORT_TITLE = 'דוח ביצוע מצטבר';
const ADD_COMMENT = '+ הוסף הערה חדשה';

export const ContractActuals = (props: IContractActualsProps) => {
  const router = useRouter();
  const { showModal } = useModalContext();
  const { data: confirmFlow } = useProjectConfirmsSettingsContext();
  const {
    data: { contract, accounts, sections, workspaces },
    isLoading,
  } = useContractContext();
  const currentAccount =
    accounts.length > 0
      ? accounts.reduce((prev, curr) =>
          curr[EAccountFields.PeriodNumber] > prev[EAccountFields.PeriodNumber]
            ? curr
            : prev,
        )
      : null;

  const currentStage = currentAccount![EAccountFields.AccountStage];
  const isActiveContract =
    contract![EContractFields.Status] === EContractStatus.Active;
  const currentConfirmFlow = confirmFlow.find(
    (flow) => flow.id === currentStage,
  );
  const nextConfirmFlow = confirmFlow.find(
    (flow) => flow.id === currentConfirmFlow?.[EConfirmFields.NextConfirm],
  );

  const handleChangeContractToPlan = async () => {
    try {
      const docRef = doc(firestore, contract?.[ECommonFields.Path] as string);
      await updateDoc(docRef, {
        [EContractFields.Status]: EContractStatus.Plan,
      });
      router.push({
        pathname: ERoutesNames.Contract,
        query: {
          ...router.query,
          [CONTRACT_STAGE_QUERY]: EContractStage.Plan,
        },
      });
    } catch (err) {
      showToastError(err);
    }
  };
  const handleConfirmAccountStage = async () => {
    const docRef = doc(firestore, currentAccount![ECommonFields.Path]);
    const preparedData = {
      [EAccountFields.ConfirmFlow]: currentAccount![
        EAccountFields.ConfirmFlow
      ]!.map((flow) =>
        flow.id === currentStage
          ? {
              ...flow,
              [EConfirmFields.ConfirmStatus]: EConfirmStatus.Approve,
              [EConfirmFields.ApprovedAt]: dayjs().toISOString(),
              [EConfirmFields.ApprovedBy]: auth.currentUser?.email ?? '',
            }
          : flow,
      ),
      [EAccountFields.AccountStage]: nextConfirmFlow?.id ?? '',
    };
    try {
      await setDoc(docRef, preparedData, { merge: true });
    } catch (err) {
      showToastError(err);
    }
  };

  return isLoading ? null : (
    <>
      <StyledRow>
        {currentAccount ? (
          <ContractConfirms
            confirmEnabled={isActiveContract}
            account={currentAccount}
            handleConfirmAccountStage={handleConfirmAccountStage}
          />
        ) : (
          <Button
            onClick={() =>
              showModal({
                name: EModalName.PeriodSelectionForm,
                lastPeriod: '',
                periodUnit: EPeriodUnit.M,
                confirmFlow,
              })
            }
            disabled={!isActiveContract}
          >
            First Account
          </Button>
        )}
        <ChatCard title={CHAT_TITLE} addNewText={ADD_COMMENT} />
      </StyledRow>
      <ReportTable
        columns={columns}
        sections={prepareContractActualsReport(sections, workspaces)}
        title={REPORT_TITLE}
        onRowClick={({ id }) => {
          router.push({
            pathname: ERoutesNames.SectionActual,
            query: {
              ...router.query,
              [SECTION_ID_QUERY]: id,
            },
          });
        }}
      />
      <StyledRow>
        {currentStage &&
          ![EConfirmFlowControls.Start, EConfirmFlowControls.End].includes(
            currentStage as EConfirmFlowControls,
          ) && (
            <Button
              onClick={handleConfirmAccountStage}
              style={{ justifySelf: 'center' }}
              disabled={!isActiveContract}
            >
              {currentConfirmFlow?.title}
            </Button>
          )}
        {isActiveContract && (
          <Button onClick={handleChangeContractToPlan}>Go To Plan View</Button>
        )}
      </StyledRow>
    </>
  );
};
