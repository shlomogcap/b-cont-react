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
import { AccountForm } from '@/lib/components/AccountForm';

export const ContractBilling = (_props: IContractBillingProps) => {
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
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'max-content 1fr',
          columnGap: '1rem',
        }}
      >
        <div
          style={{
            background: 'white',
            maxHeight: '70vh',
            overflowY: 'scroll',
            padding: '2rem',
          }}
        >
          <AccountForm readOnly={false} account={currentAccount!} />
        </div>
        <div style={{ background: 'red' }}>PAYEMNTS PLACEHOLDER</div>
      </div>
      <ContractActionsRow
        currentAccount={currentAccount!}
        currentStage={currentStage!}
        isActiveContract={isActiveContract}
      />
    </>
  );
};
