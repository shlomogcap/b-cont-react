import { ILang } from '../displayTexts';
import { EAccountConfirms } from './AccountConfirms';
import { EProjectAccountsFields } from './ProjectAccountFields';

type IDisplayTextMapping = {
  fields: Record<EProjectAccountsFields, string>;
  confirms: Record<EAccountConfirms, string>;
};

export const PROJECT_ACCOUNTS_DISPLAY_TEXTS: Record<
  ILang,
  IDisplayTextMapping
> = {
  he: {
    fields: {
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
    confirms: {
      [EAccountConfirms.Start]: 'אתחול ועדכון',
      [EAccountConfirms.Projectmanager]: 'אישור מ.פרוייקט',
      [EAccountConfirms.Manager]: 'אישור מהנדס חברה/מנכ״ל',
      [EAccountConfirms.Accounting]: 'אישור הנה״ח',
      [EAccountConfirms.Financing]: 'אישור כספים',
      [EAccountConfirms.ExternalSoftware]: 'הזנה לסאפ',
      [EAccountConfirms.Billing]: 'צ׳ק מאושר',
    },
  },
  en: {
    fields: {
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
    confirms: {
      [EAccountConfirms.Start]: 'Account Init',
      [EAccountConfirms.Projectmanager]: 'Project Manager Approve',
      [EAccountConfirms.Manager]: 'Senior Manager Approve',
      [EAccountConfirms.Accounting]: 'Accounting Approve',
      [EAccountConfirms.Financing]: 'Financing Approve',
      [EAccountConfirms.ExternalSoftware]: 'Entered To SAP',
      [EAccountConfirms.Billing]: 'Billing Ready',
    },
  },
};
