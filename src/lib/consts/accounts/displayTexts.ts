import { ILang } from '../displayTexts';
import { EAccountFields } from './AccountFields';
import { EProjectAccountsFields } from './ProjectAccountFields';

type IDisplayTextMapping = {
  accountFields: Record<EAccountFields, string>;
  projectAccountReportFields: Record<EProjectAccountsFields, string>;
};

export const PROJECT_ACCOUNTS_DISPLAY_TEXTS: Record<
  ILang,
  IDisplayTextMapping
> = {
  he: {
    accountFields: {
      [EAccountFields.Title]: 'חשבון',
      [EAccountFields.Description]: 'תיאור',
      [EAccountFields.PeriodUnit]: 'סוג תדירות חשבון',
      [EAccountFields.PeriodFrequancey]: 'תדירות חשבון',
      [EAccountFields.Period]: 'תקופה',

      [EAccountFields.PeriodNumber]: '# תקופה',
      [EAccountFields.ConfirmFlow]: 'סבב אישורים',
      [EAccountFields.AccountStage]: 'סטטוס נוכחי',
      [EAccountFields.BillingDate]: 'תאריך עריכת תשלום',

      [EAccountFields.TotalSections]: 'סהכ סעיפים',
      [EAccountFields.TotalAdditions]: 'סהכ תוספות',
      [EAccountFields.TotalSubtractions]: 'סהכ קיזוזים',
      [EAccountFields.AccumulatedTotal]: 'סכום מצטבר לתשלום',

      [EAccountFields.DelayPercentage]: 'אחוז עיכבון',
      [EAccountFields.TotalDelay]: 'סכום עכבון',

      [EAccountFields.DelayRelease]: 'סכום שחרור עכבון',
      [EAccountFields.TotalAccountToPay]: 'לתשלום',

      [EAccountFields.IndexedPercent]: '% הצמדה',
      [EAccountFields.TotalIndexed]: 'סכום הצמדה',
      [EAccountFields.TotalAfterIndexed]: 'סכום לאחר הצמדה',

      [EAccountFields.VatPercent]: '% מעמ',
      [EAccountFields.TotalVAT]: 'סכום מעמ',

      [EAccountFields.TaxPercent]: '% ניכוי מס',
      [EAccountFields.TotalTax]: 'סכום ניכוי מס',

      [EAccountFields.TotalToPay]: 'סכום סופי לתשלום',
    },
    projectAccountReportFields: {
      [EProjectAccountsFields.Contract]: 'חוזה',
      [EProjectAccountsFields.Vendor]: 'קבלן',
      [EProjectAccountsFields.AccumulatedTotal]: 'חשבון מצטבר',
      [EProjectAccountsFields.AccumulatedHisotry]: 'מצטבר תק׳ קודמות',
      [EProjectAccountsFields.AccountAdditions]: 'תק׳ נוכחית תוספות',
      [EProjectAccountsFields.AccountSubtractions]: 'תק׳ נוכחית קיזוזים',
      [EProjectAccountsFields.AccountPeriod]: 'חשבון נוכחי',
      [EProjectAccountsFields.AccountToPay]: 'תשלום תק׳ נוכחית',
      [EProjectAccountsFields.ContractSum]: 'סכום הסכם',
      [EProjectAccountsFields.TotalAdditionsSubtractions]: 'תוספות וקיזוזים',
      [EProjectAccountsFields.TotalToPay]: 'יתרה לתשלום',
      [EProjectAccountsFields.PaidPercentage]: '% ששולם',
    },
  },
  en: {
    accountFields: {
      [EAccountFields.Title]: 'Account',
      [EAccountFields.Description]: 'Description',
      [EAccountFields.PeriodUnit]: 'Period Unit Type',
      [EAccountFields.PeriodFrequancey]: 'Period Frequancey',
      [EAccountFields.Period]: 'Period',

      [EAccountFields.PeriodNumber]: '# Period',
      [EAccountFields.ConfirmFlow]: 'Confirm Flow',
      [EAccountFields.AccountStage]: 'Account Stage',
      [EAccountFields.BillingDate]: 'Billing Date',

      [EAccountFields.TotalSections]: 'Total Sections',
      [EAccountFields.TotalAdditions]: 'Total Additions',
      [EAccountFields.TotalSubtractions]: 'Total Subtractions',
      [EAccountFields.AccumulatedTotal]: 'Accumulated Total',

      [EAccountFields.DelayPercentage]: 'Delay Percentage',
      [EAccountFields.TotalDelay]: 'Total Delay',

      [EAccountFields.DelayRelease]: 'Delay Release',
      [EAccountFields.TotalAccountToPay]: 'Total Account To Pay',

      [EAccountFields.IndexedPercent]: 'Indexed Percent',
      [EAccountFields.TotalIndexed]: 'Total Indexed',
      [EAccountFields.TotalAfterIndexed]: 'Total After Indexed',

      [EAccountFields.VatPercent]: 'Vat Percent',
      [EAccountFields.TotalVAT]: 'Total VAT',

      [EAccountFields.TaxPercent]: 'Tax Percent',
      [EAccountFields.TotalTax]: 'Total Tax',

      [EAccountFields.TotalToPay]: 'Total To Pay',
    },

    projectAccountReportFields: {
      [EProjectAccountsFields.Contract]: 'Contract',
      [EProjectAccountsFields.Vendor]: 'Vendor',
      [EProjectAccountsFields.AccumulatedTotal]: 'Accumulated Total',
      [EProjectAccountsFields.AccumulatedHisotry]: 'Accumulated Hisotry',
      [EProjectAccountsFields.AccountAdditions]: 'Additions',
      [EProjectAccountsFields.AccountSubtractions]: 'Subtractions',
      [EProjectAccountsFields.AccountPeriod]: 'Period',
      [EProjectAccountsFields.AccountToPay]: 'Account To Pay',
      [EProjectAccountsFields.ContractSum]: 'Contract Sum',
      [EProjectAccountsFields.TotalAdditionsSubtractions]:
        'Total Additions Subtractions',
      [EProjectAccountsFields.TotalToPay]: 'Total To Pay',
      [EProjectAccountsFields.PaidPercentage]: 'Paid %',
    },
  },
};
