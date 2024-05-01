import { IReportTableSection } from '@/lib/components/ReportTable';
import {
  CONTRACT_BILLING_REPORT_DISPLAY_TEXTS,
  EContractBillingReportTableFields,
} from './ContractBilling.consts';
import { IContractDoc } from '@/lib/consts/contracts';
import { IAccountDoc } from '@/lib/consts/accounts/AccountDoc';
import { ISectionDoc } from '@/lib/consts/sections';
import { IWorkspaceDoc } from '@/lib/consts/workspaces';
import { IActualDoc } from '@/lib/consts/actuals/ActualDoc';
import { ECommonFields } from '@/lib/consts/commonFields';
import { EAccountFields } from '@/lib/consts/accounts/AccountFields';
import { ITableRow } from '@/lib/components/commons/Table';
import { sumBy } from 'lodash-es';

type IPrepareContractBillingReportArgs = {
  contract: IContractDoc;
  accounts: IAccountDoc[];
  contractSections: ISectionDoc[];
  workspaces: IWorkspaceDoc[];
  actuals: IActualDoc[];
  currentAccount: IAccountDoc;
};

const accountDataToBillingReportRow = ({
  account,
}: {
  account: IAccountDoc;
}) => {
  return {
    [ECommonFields.Id]: account.id,
    [EContractBillingReportTableFields.PeriodNumber]:
      account[EAccountFields.PeriodNumber],
    [EContractBillingReportTableFields.Period]: account[EAccountFields.Period],
    [EContractBillingReportTableFields.TotalSections]:
      account[EAccountFields.TotalSections],
    [EContractBillingReportTableFields.TotalAdditionsSubtractions]:
      account[EAccountFields.TotalAdditions] -
      account[EAccountFields.TotalSubtractions],
    [EContractBillingReportTableFields.AccumulatedTotal]:
      account[EAccountFields.AccumulatedTotal],
    [EContractBillingReportTableFields.TotalDelay]:
      account[EAccountFields.TotalDelay],
    [EContractBillingReportTableFields.TotalAccountToPay]:
      account[EAccountFields.TotalAccountToPay],
    [EContractBillingReportTableFields.IndexedPercent]:
      account[EAccountFields.IndexedPercent],
    [EContractBillingReportTableFields.TotalIndexed]:
      account[EAccountFields.TotalIndexed],
    [EContractBillingReportTableFields.TotalAfterIndexed]:
      account[EAccountFields.TotalAfterIndexed],
    [EContractBillingReportTableFields.VatPercent]:
      account[EAccountFields.VatPercent],
    [EContractBillingReportTableFields.TotalVAT]:
      account[EAccountFields.TotalVAT],
    [EContractBillingReportTableFields.TotalBeforeTax]: 0,
    [EContractBillingReportTableFields.TaxPercent]:
      account[EAccountFields.TaxPercent],
    [EContractBillingReportTableFields.TotalTax]:
      account[EAccountFields.TotalTax],
    [EContractBillingReportTableFields.TotalToPay]:
      account[EAccountFields.TotalToPay],
  };
};

const getAccountsTotal = ({
  rows,
  title,
}: {
  rows: ITableRow<any>[];
  title: string;
}) => {
  return {
    [EContractBillingReportTableFields.PeriodNumber]: title,
    [EContractBillingReportTableFields.TotalSections]: sumBy(
      rows,
      EContractBillingReportTableFields.TotalSections,
    ),
    [EContractBillingReportTableFields.TotalAdditionsSubtractions]: sumBy(
      rows,
      EContractBillingReportTableFields.TotalAdditionsSubtractions,
    ),
    [EContractBillingReportTableFields.AccumulatedTotal]: sumBy(
      rows,
      EContractBillingReportTableFields.AccumulatedTotal,
    ),
    [EContractBillingReportTableFields.TotalDelay]: sumBy(
      rows,
      EContractBillingReportTableFields.TotalDelay,
    ),
    [EContractBillingReportTableFields.TotalAccountToPay]: sumBy(
      rows,
      EContractBillingReportTableFields.TotalAccountToPay,
    ),
    [EContractBillingReportTableFields.IndexedPercent]: sumBy(
      rows,
      EContractBillingReportTableFields.IndexedPercent,
    ),
    [EContractBillingReportTableFields.TotalIndexed]: sumBy(
      rows,
      EContractBillingReportTableFields.TotalIndexed,
    ),
    [EContractBillingReportTableFields.TotalAfterIndexed]: sumBy(
      rows,
      EContractBillingReportTableFields.TotalAfterIndexed,
    ),
    [EContractBillingReportTableFields.VatPercent]: sumBy(
      rows,
      EContractBillingReportTableFields.VatPercent,
    ),
    [EContractBillingReportTableFields.TotalVAT]: sumBy(
      rows,
      EContractBillingReportTableFields.TotalVAT,
    ),
    [EContractBillingReportTableFields.TotalBeforeTax]: sumBy(
      rows,
      EContractBillingReportTableFields.TotalBeforeTax,
    ),
    [EContractBillingReportTableFields.TaxPercent]: sumBy(
      rows,
      EContractBillingReportTableFields.TaxPercent,
    ),
    [EContractBillingReportTableFields.TotalTax]: sumBy(
      rows,
      EContractBillingReportTableFields.TotalTax,
    ),
    [EContractBillingReportTableFields.TotalToPay]: sumBy(
      rows,
      EContractBillingReportTableFields.TotalToPay,
    ),
  };
};

export const prepareContractBillingReport = ({
  contract,
  accounts,
  currentAccount,
  workspaces,
  contractSections,
  actuals,
}: IPrepareContractBillingReportArgs): IReportTableSection<EContractBillingReportTableFields>[] => {
  const result: IReportTableSection<EContractBillingReportTableFields>[] = [];

  const historyRows = accounts
    .filter((account) => account.period !== currentAccount.period)
    .map((account) => accountDataToBillingReportRow({ account }));

  result.push({
    title: CONTRACT_BILLING_REPORT_DISPLAY_TEXTS.he.reportHisrotySectionTitle,
    rows: historyRows,
    totals: getAccountsTotal({
      rows: historyRows,
      title:
        CONTRACT_BILLING_REPORT_DISPLAY_TEXTS.he.reportHisrotySectionTotals,
    }),
  });
  result.push({
    title: CONTRACT_BILLING_REPORT_DISPLAY_TEXTS.he.reportCurrentSectionTitle,
    rows: [accountDataToBillingReportRow({ account: currentAccount })],
  });
  result.push({
    title: '',
    rows: [],
    totals: getAccountsTotal({
      rows: [...(result?.[0]?.rows ?? []), ...(result?.[1]?.rows ?? [])],
      title: CONTRACT_BILLING_REPORT_DISPLAY_TEXTS.he.reportTotalsTitle,
    }),
  });
  return result;
};
