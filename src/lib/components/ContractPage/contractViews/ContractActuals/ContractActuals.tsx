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
import { doc, setDoc } from 'firebase/firestore';
import { auth, firestore } from '@/lib/firebase';
import { EConfirmStatus } from '@/lib/consts/confirms/ConfirmStatus';
import { EConfirmFields } from '@/lib/consts/confirms/ConfirmFields';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { FirebaseError } from 'firebase/app';

//TODO: DISPLAY_TEXTS
const CHAT_TITLE = 'לוג הערות לחוזה';
const REPORT_TITLE = 'דוח ביצוע מצטבר';
const ADD_COMMENT = '+ הוסף הערה חדשה';

export const ContractActuals = (props: IContractActualsProps) => {
  // const account = {
  //   accountStage: 'finish',
  //   period: '2020-04',
  // } as IAccountDoc; //TODO: get from context with current account
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
  const currentConfirmFlow = confirmFlow.find(
    (flow) => flow.id === currentStage,
  );
  const nextConfirmFlow = confirmFlow.find(
    (flow) => flow.id === currentConfirmFlow?.[EConfirmFields.NextConfirm],
  );

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
      toast.error(
        err instanceof FirebaseError
          ? err.message
          : JSON.stringify(err ?? { error: 'Unexpected Error' }),
      );
    }
  };

  return isLoading ? null : (
    <>
      <StyledRow>
        {currentAccount ? (
          <ContractConfirms
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
        onRowClick={() => alert('TODO: show actuals modal')}
      />
      <StyledRow>
        {currentStage && !['start', 'end'].includes(currentStage!) && (
          <Button
            onClick={handleConfirmAccountStage}
            style={{ justifySelf: 'center' }}
          >
            {currentConfirmFlow?.title}
          </Button>
        )}
      </StyledRow>
    </>
  );
};
