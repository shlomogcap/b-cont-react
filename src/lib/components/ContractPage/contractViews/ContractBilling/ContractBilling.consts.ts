import {
  PAYMENT_CHANNEL_OPTIONS,
  PAYMENT_TYPE_OPTIONS,
} from '@/lib/components/PaymentForm/PaymentForm.consts';
import {
  ITableColumnOption,
  fieldsNamesToColumns,
} from '@/lib/components/commons/Table';
import { ILang } from '@/lib/consts/displayTexts';
import { EPaymentFields } from '@/lib/consts/payments/PaymentFields';
import { PAYMENTS_DISPLAY_TEXTS } from '@/lib/consts/payments/displayTexts';

export enum EContractBillingReportTableFields {
  PeriodNumber = 'PeriodNumber',
  Period = 'period',
  TotalSections = 'totalSections',
  TotalAdditionsSubtractions = 'totalAdditionsSubtractions',
  AccumulatedTotal = 'accumulatedTotal',
  TotalDelay = 'totalDelay',
  TotalAccountToPay = 'totalAccountToPay',
  IndexedPercent = 'indexedPercent',
  TotalIndexed = 'totalIndexed',
  TotalAfterIndexed = 'totalAfterIndexed',
  VatPercent = 'vatPercent',
  TotalVAT = 'totalVAT',
  TotalBeforeTax = 'totalBeforeTax',
  TaxPercent = 'taxPercent',
  TotalTax = 'totalTax',
  TotalToPay = 'totalToPay',
}

type IDispalyTexts = Record<
  ILang,
  {
    fields: Record<EContractBillingReportTableFields, string>;
    reportTitle: string;
    chatBlockTitle: string;
    reportHisrotySectionTitle: string;
    reportHisrotySectionTotals: string;
    reportCurrentSectionTitle: string;
    reportTotalsTitle: string;
  }
>;

export const CONTRACT_BILLING_REPORT_DISPLAY_TEXTS: IDispalyTexts = {
  he: {
    fields: {
      [EContractBillingReportTableFields.PeriodNumber]: 'מס׳ חשבון',
      [EContractBillingReportTableFields.Period]: 'תקופה',
      [EContractBillingReportTableFields.TotalSections]: 'קרן מאושר',
      [EContractBillingReportTableFields.TotalAdditionsSubtractions]:
        'תוספות / קיזוזים',
      [EContractBillingReportTableFields.AccumulatedTotal]: 'סה"כ לפני עיכבון',
      [EContractBillingReportTableFields.TotalDelay]: 'עיכבון',
      [EContractBillingReportTableFields.TotalAccountToPay]: 'לתשלום',
      [EContractBillingReportTableFields.IndexedPercent]: '% הצמדה',
      [EContractBillingReportTableFields.TotalIndexed]: 'סכום הצמדה',
      [EContractBillingReportTableFields.TotalAfterIndexed]: 'סכום לאחר הצמדה',
      [EContractBillingReportTableFields.VatPercent]: '% מעמ',
      [EContractBillingReportTableFields.TotalVAT]: 'סהכ מעמ',
      [EContractBillingReportTableFields.TotalBeforeTax]: 'לתשלום לפני ניכוי',
      [EContractBillingReportTableFields.TaxPercent]: '% ניכוי מס',
      [EContractBillingReportTableFields.TotalTax]: 'ניכוי מס',
      [EContractBillingReportTableFields.TotalToPay]: 'לתשלום סופי',
    },
    reportTitle: '',
    reportHisrotySectionTitle: 'חשבונות קודמים',
    reportHisrotySectionTotals: 'סהכ חשבונות קודמים',
    reportCurrentSectionTitle: 'נוכחי',
    reportTotalsTitle: 'סהכ',
    chatBlockTitle: '',
  },
  en: {
    fields: {
      [EContractBillingReportTableFields.PeriodNumber]: '# Period',
      [EContractBillingReportTableFields.Period]: 'Period',
      [EContractBillingReportTableFields.TotalSections]:
        'Total Sections Approved',
      [EContractBillingReportTableFields.TotalAdditionsSubtractions]:
        'Additions / Subtractions',
      [EContractBillingReportTableFields.AccumulatedTotal]: 'Accumulated Total',
      [EContractBillingReportTableFields.TotalDelay]: 'Delay',
      [EContractBillingReportTableFields.TotalAccountToPay]: 'Account To Pay',
      [EContractBillingReportTableFields.IndexedPercent]: 'Indexed %',
      [EContractBillingReportTableFields.TotalIndexed]: 'Total Indexed',
      [EContractBillingReportTableFields.TotalAfterIndexed]: 'After Indexed',
      [EContractBillingReportTableFields.VatPercent]: 'VAT Percent',
      [EContractBillingReportTableFields.TotalVAT]: 'Total VAT',
      [EContractBillingReportTableFields.TotalBeforeTax]: 'Total Before Tax',
      [EContractBillingReportTableFields.TaxPercent]: 'Tax %',
      [EContractBillingReportTableFields.TotalTax]: 'Tax',
      [EContractBillingReportTableFields.TotalToPay]: 'Total To Pay',
    },
    reportTitle: '',
    reportHisrotySectionTitle: 'History',
    reportHisrotySectionTotals: 'Total History',
    reportCurrentSectionTitle: 'Current Account',
    reportTotalsTitle: 'Total',
    chatBlockTitle: '',
  },
};

export const PAYMENTS_TABLE_COLUMNS = fieldsNamesToColumns(
  [
    { field: EPaymentFields.PaymentDate, type: 'date' },
    {
      field: EPaymentFields.PaymentChannel,
      type: 'list',
      options: PAYMENT_CHANNEL_OPTIONS as ITableColumnOption[],
    },
    {
      field: EPaymentFields.PaymentType,
      type: 'list',
      options: PAYMENT_TYPE_OPTIONS as ITableColumnOption[],
    },
    EPaymentFields.PaymentIdentifier,
    { field: EPaymentFields.Sum, type: 'currency' },
  ],
  PAYMENTS_DISPLAY_TEXTS.he.fields,
);

export const BILLING_REPORT_COLUMNS = fieldsNamesToColumns(
  [
    EContractBillingReportTableFields.PeriodNumber,
    EContractBillingReportTableFields.Period,
    {
      type: 'currency',
      field: EContractBillingReportTableFields.TotalSections,
    },
    {
      type: 'currency',
      field: EContractBillingReportTableFields.TotalAdditionsSubtractions,
    },
    {
      type: 'currency',
      field: EContractBillingReportTableFields.AccumulatedTotal,
    },
    {
      type: 'currency',
      field: EContractBillingReportTableFields.TotalDelay,
    },
    {
      type: 'currency',
      field: EContractBillingReportTableFields.TotalAccountToPay,
    },
    {
      type: 'percentage',
      field: EContractBillingReportTableFields.IndexedPercent,
    },
    {
      type: 'currency',
      field: EContractBillingReportTableFields.TotalIndexed,
    },
    {
      type: 'currency',
      field: EContractBillingReportTableFields.TotalAfterIndexed,
    },
    {
      type: 'percentage',
      field: EContractBillingReportTableFields.VatPercent,
    },
    {
      type: 'currency',
      field: EContractBillingReportTableFields.TotalVAT,
    },
    {
      type: 'currency',
      field: EContractBillingReportTableFields.TotalBeforeTax,
    },
    {
      type: 'percentage',
      field: EContractBillingReportTableFields.TaxPercent,
    },
    {
      type: 'currency',
      field: EContractBillingReportTableFields.TotalTax,
    },
    {
      type: 'currency',
      field: EContractBillingReportTableFields.TotalToPay,
    },
  ],
  CONTRACT_BILLING_REPORT_DISPLAY_TEXTS.he.fields,
);
