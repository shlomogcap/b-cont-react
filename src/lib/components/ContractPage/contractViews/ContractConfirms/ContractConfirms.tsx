import { Card } from '@/lib/components/commons/Card';
import { IContractConfirmsProps } from './ContractConfirms.types';
import { Button } from '@/lib/components/commons/Button';
import { EAccountFields } from '@/lib/consts/accounts/AccountFields';
import {
  StyledConfirmHeader,
  StyledConfirmLabel,
  StyledConfirmValue,
  StyledContractConfirms,
  StyledPeriod,
  StyledPeriodLabel,
} from './ContractConfirms.styled';
import { CONFIRMS_DATA } from './ContractConfirms.consts';
import { StyledActionsRow } from '../ContractPlan/ContractPlan.styled';

//TODO: move to DISPALY_TEXTS
const TITLE = 'סטטוס אישורי ביצוע';
const START = 'אתחול';
const FINISH = 'יצירת תקופה חדשה';
const PERIOD_LABEL = 'חשבון תקופה';

export const ContractConfirms = ({ acccount }: IContractConfirmsProps) => {
  const stage = acccount[EAccountFields.AccountStage];
  return (
    <Card title={TITLE}>
      {['start', 'finish'].includes(stage!) && (
        <StyledActionsRow>
          {stage === 'start' && <Button>{START}</Button>}
          {stage === 'finish' && <Button>{FINISH}</Button>}
        </StyledActionsRow>
      )}
      <StyledPeriod>
        <StyledPeriodLabel>{PERIOD_LABEL}</StyledPeriodLabel>
        <StyledPeriodLabel>{acccount[EAccountFields.Period]}</StyledPeriodLabel>
      </StyledPeriod>
      <StyledContractConfirms>
        {CONFIRMS_DATA.map((confirmItem, ind) => (
          <>
            <StyledConfirmHeader style={{ gridArea: `1/${ind + 1}` }}>
              {confirmItem.title}
            </StyledConfirmHeader>
            <StyledConfirmLabel style={{ gridArea: `2/${ind + 1}` }}>
              בוצע
            </StyledConfirmLabel>
            <StyledConfirmValue style={{ gridArea: `3/${ind + 1}` }}>
              {confirmItem.confirmAt}
            </StyledConfirmValue>
            <StyledConfirmValue style={{ gridArea: `4/${ind + 1}` }}>
              {confirmItem.confirmBy}
            </StyledConfirmValue>
          </>
        ))}
      </StyledContractConfirms>
    </Card>
  );
};
/** 
 * TODO:
 * - loading state
 * - create dispaly texts
 * - period label for month should be ltr and represend the period
 * - handle account change (think is the account is part of the url state?)
 * - iteration over confirms from model + make sure to get only the operation confirms (not billing one) - sort by orderIndex
 * - highlight dueDiff , e.g. :
    const dueDiff = diffDays(addMonths(1, textToDate(currentAccount.docData.month, due)), new Date())
    const isDelay = dueDiff > 0 && confirm !== true
 * - date confirm dispaly with delay tag:defaultdDayDisplay(currentAccount, due), isDelay && m("span", { style: "font-weight:600;font-size:1.4rem" }, `לפני ${parseInt(dueDiff)} יום`)
 * - dispaly datetime format
 * - dispaly user name/email by it's id
 * - dispaly user name/email by it's id
 * */
