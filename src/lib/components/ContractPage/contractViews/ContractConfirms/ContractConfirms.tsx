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
import { StyledActionsRow } from '../ContractPlan/ContractPlan.styled';
import { useModalContext } from '@/lib/context/ModalProvider/ModalProvider';
import { EModalName } from '@/lib/context/ModalProvider/ModalName';
import { EPeriodUnit } from '@/lib/consts/accounts/PeriodUnit';
import { useProjectConfirmsSettingsContext } from '@/lib/context/projectConfirmsSettingsContext';
import { EConfirmType } from '@/lib/consts/confirms/ConfirmType';
import { EConfirmFields } from '@/lib/consts/confirms/ConfirmFields';
import { formatDate } from '@/lib/utils/dateUtils';
import { CONFIRMS_DISPLAY_TEXTS } from '@/lib/consts/confirms/displayTexts';
import { EConfirmStatus } from '@/lib/consts/confirms/ConfirmStatus';
import dayjs from 'dayjs';
import { EConfirmFlowControls } from '@/lib/consts/confirms/ConfirmFlowControls';

export const ContractConfirms = ({
  account,
  handleConfirmAccountStage,
}: IContractConfirmsProps) => {
  const { showModal } = useModalContext();
  const stage = account[EAccountFields.AccountStage];
  const confirmsData = account[EAccountFields.ConfirmFlow];
  const [month, year] = account.period?.split(' ') ?? [];
  const { data: confirmFlow } = useProjectConfirmsSettingsContext();
  return (
    <Card title={CONFIRMS_DISPLAY_TEXTS.he.confirmViewTitle}>
      {[EConfirmFlowControls.Start, EConfirmFlowControls.End].includes(
        stage as EConfirmFlowControls,
      ) && (
        <StyledActionsRow>
          {stage === EConfirmFlowControls.Start && (
            <Button onClick={handleConfirmAccountStage}>
              {
                CONFIRMS_DISPLAY_TEXTS.he.confirmViewControls[
                  EConfirmFlowControls.Start
                ]
              }
            </Button>
          )}
          {stage === EConfirmFlowControls.End && (
            <Button
              onClick={() =>
                showModal({
                  name: EModalName.PeriodSelectionForm,
                  lastPeriod: `${year}-${Number(month) - 1}-1`,
                  periodUnit: EPeriodUnit.M,
                  confirmFlow,
                })
              }
            >
              {
                CONFIRMS_DISPLAY_TEXTS.he.confirmViewControls[
                  EConfirmFlowControls.End
                ]
              }
            </Button>
          )}
        </StyledActionsRow>
      )}
      <StyledPeriod>
        <StyledPeriodLabel>
          {CONFIRMS_DISPLAY_TEXTS.he.showPeriodLabel}
        </StyledPeriodLabel>
        <StyledPeriodLabel>{account[EAccountFields.Period]}</StyledPeriodLabel>
      </StyledPeriod>
      <StyledContractConfirms>
        {confirmsData
          ?.filter(
            (confirmItem) => confirmItem.confirmType === EConfirmType.Actual,
          )
          .sort((a, b) => a.orderIndex - b.orderIndex)
          .map((confirmItem, ind) => {
            const dueDate = dayjs()
              .set('year', Number(year))
              .set('month', Number(month) - 1)
              .set('date', confirmItem.due);

            return (
              <>
                <StyledConfirmHeader style={{ gridArea: `1/${ind + 1}` }}>
                  {confirmItem.title}
                </StyledConfirmHeader>
                <StyledConfirmLabel style={{ gridArea: `2/${ind + 1}` }}>
                  {confirmItem.approvedAt
                    ? CONFIRMS_DISPLAY_TEXTS.he.confirmStatus[
                        EConfirmStatus.Approve
                      ]
                    : dueDate.format('DD/MM/YYYY')}
                </StyledConfirmLabel>
                <StyledConfirmValue style={{ gridArea: `3/${ind + 1}` }}>
                  {formatDate(confirmItem[EConfirmFields.ApprovedAt])}
                </StyledConfirmValue>
                <StyledConfirmValue style={{ gridArea: `4/${ind + 1}` }}>
                  {confirmItem.approvedBy || '---'}
                </StyledConfirmValue>
              </>
            );
          })}
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
