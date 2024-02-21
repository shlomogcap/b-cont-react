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
  return isLoading ? (
    ''
  ) : (
    <>
      <StyledRow>
        {currentAccount ? (
          <ContractConfirms account={currentAccount} />
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
    </>
  );
};
