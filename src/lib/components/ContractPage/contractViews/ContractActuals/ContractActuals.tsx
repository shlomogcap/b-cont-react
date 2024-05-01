import { ContractConfirms } from '../ContractConfirms';
import { IContractActualsProps } from './ContractActuals.types';
import { ChatCard } from '@/lib/components/commons/ChatCard';
import { ReportTable } from '@/lib/components/ReportTable';
import {
  CONTRACT_ACTUALS_REPORT_DISPLAY_TEXTS,
  EContractActualsButtons,
  columns,
} from './ContractActuals.consts';
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
import { FirstAccountButton } from '../FirstAccountButton';
import { StyledContractPageRow } from '../../ContractPage.styled';
import { ContractProgressRow } from '../ContractProgressRow';

export const ContractActuals = (props: IContractActualsProps) => {
  const router = useRouter();
  const { data: confirmFlow, handleConfirmAccountStage } =
    useProjectConfirmsSettingsContext();
  const {
    data: { contract, accounts, sections, workspaces, actuals },
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

  const currentStage = currentAccount?.[EAccountFields.AccountStage];
  const isActiveContract =
    contract![EContractFields.Status] === EContractStatus.Active;
  const currentConfirmFlow = confirmFlow.find(
    (flow) => flow.id === currentStage,
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

  return isLoading ? null : (
    <>
      <ContractProgressRow
        confirmFlow={confirmFlow}
        currentAccount={currentAccount!}
        isActiveContract={isActiveContract}
      />
      <ReportTable
        columns={columns}
        sections={prepareContractActualsReport({
          contract: contract!,
          accounts,
          currentAccount: currentAccount!,
          contractSections: sections,
          workspaces,
          actuals,
        })}
        title={CONTRACT_ACTUALS_REPORT_DISPLAY_TEXTS.he.reportTitle}
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
      <StyledContractPageRow style={{ justifyContent: 'flex-end' }}>
        {currentStage &&
          ![EConfirmFlowControls.Start, EConfirmFlowControls.End].includes(
            currentStage as EConfirmFlowControls,
          ) && (
            <Button
              onClick={() =>
                handleConfirmAccountStage({ confirmFlow, currentAccount })
              }
              style={{ justifySelf: 'center' }}
              disabled={!isActiveContract}
            >
              {currentConfirmFlow?.title}
            </Button>
          )}
        {isActiveContract && (
          <Button onClick={handleChangeContractToPlan}>Go To Plan View</Button>
        )}
      </StyledContractPageRow>
    </>
  );
};
