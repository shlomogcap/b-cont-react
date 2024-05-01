import { useRouter } from 'next/router';
import { IContractBillingProps } from './ContractBilling.types';
import { useContractContext } from '@/lib/context/contractContext';
import { EAccountFields } from '@/lib/consts/accounts/AccountFields';
import { EContractFields, EContractStatus } from '@/lib/consts/contracts';
import { ContractProgressRow } from '../ContractProgressRow';
import { ContractActionsRow } from '../ContractActionsRow';
import { EConfirmType } from '@/lib/consts/confirms/ConfirmType';
import {
  CONTRACT_BILLING_REPORT_DISPLAY_TEXTS,
  EContractBillingReportTableFields,
} from './ContractBilling.consts';
import { ReportTable } from '@/lib/components/ReportTable';
import { fieldsNamesToColumns } from '@/lib/components/commons/Table';
import { prepareContractBillingReport } from './ContractBilling.utils';

export const ContractBilling = (props: IContractBillingProps) => {
  const router = useRouter();
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

  return isLoading ? null : (
    <>
      <ContractProgressRow
        currentAccount={currentAccount!}
        isActiveContract={isActiveContract}
        confirmType={EConfirmType.Billing}
      />
      <ReportTable
        columns={fieldsNamesToColumns(
          [
            EContractBillingReportTableFields.PeriodNumber,
            EContractBillingReportTableFields.Period,
            EContractBillingReportTableFields.TotalSections,
            EContractBillingReportTableFields.TotalAdditionsSubtractions,
            EContractBillingReportTableFields.AccumulatedTotal,
            EContractBillingReportTableFields.TotalDelay,
            EContractBillingReportTableFields.TotalAccountToPay,
            EContractBillingReportTableFields.IndexedPercent,
            EContractBillingReportTableFields.TotalIndexed,
            EContractBillingReportTableFields.TotalAfterIndexed,
            EContractBillingReportTableFields.VatPercent,
            EContractBillingReportTableFields.TotalVAT,
            EContractBillingReportTableFields.TotalBeforeTax,
            EContractBillingReportTableFields.TaxPercent,
            EContractBillingReportTableFields.TotalTax,
            EContractBillingReportTableFields.TotalToPay,
          ],
          CONTRACT_BILLING_REPORT_DISPLAY_TEXTS.he.fields,
        )}
        sections={prepareContractBillingReport({
          contract: contract!,
          accounts,
          currentAccount: currentAccount!,
          workspaces: workspaces,
          contractSections: sections,
          actuals,
        })}
        title={CONTRACT_BILLING_REPORT_DISPLAY_TEXTS.he.reportTitle}
        // onRowClick={({ id }) => {
        //   router.push({
        //     pathname: ERoutesNames.SectionActual,
        //     query: {
        //       ...router.query,
        //       [SECTION_ID_QUERY]: id,
        //     },
        //   });
        // }}
      />
      <ContractActionsRow
        currentAccount={currentAccount!}
        currentStage={currentStage!}
        isActiveContract={isActiveContract}
      />
    </>
  );
};
