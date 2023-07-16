import { IAccountDoc } from '@/lib/consts/accounts/AccountDoc';
import { ContractConfirms } from '../ContractConfirms';
import { IContractActualsProps } from './ContractActuals.types';
import { ChatCard } from '@/lib/components/commons/ChatCard';
import { ReportTable } from '@/lib/components/ReportTable';
import { StyledRow } from './ContractActuals.styled';

//TODO: DISPLAY_TEXTS
const CHAT_TITLE = 'לוג הערות לחוזה';
const REPORT_TITLE = 'דוח ביצוע מצטבר';
const ADD_COMMENT = '+ הוסף הערה חדשה';

export const ContractActuals = (props: IContractActualsProps) => {
  const account = {
    accountStage: 'finish',
    period: '2020-04',
  } as IAccountDoc; //TODO: get from context with current account
  return (
    <>
      <StyledRow>
        <ContractConfirms acccount={account} />
        <ChatCard title={CHAT_TITLE} addNewText={ADD_COMMENT} />
      </StyledRow>
      <ReportTable columns={[]} sections={[]} title={REPORT_TITLE} />
    </>
  );
};
