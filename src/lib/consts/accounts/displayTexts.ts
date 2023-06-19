import { Lang } from '../displayTexts';
import { IAccountConfirms } from './AccountConfirms';
import { IProjectAccountsFields } from './ProjectAccountFields';

type IDisplayTextMapping = {
  fields: Record<IProjectAccountsFields, string>;
  confirms: Record<IAccountConfirms, string>;
};

export const PROJECT_ACCOUNTS_DISPLAY_TEXTS: Record<Lang, DisplayTextMapping> =
  {
    he: {
      fields: {
        [IProjectAccountsFields.Contract]: 'חוזה',
        [IProjectAccountsFields.Vendor]: 'קבלן',
        [IProjectAccountsFields.AccumulatedTotal]: 'חשבון מצטבר',
        [IProjectAccountsFields.AccumulatedHisotry]: 'מצטבר תק׳ קודמות',
        [IProjectAccountsFields.AccountAdditions]: 'תק׳ נוכחית תוספות',
        [IProjectAccountsFields.AccountSubtractions]: 'תק׳ נוכחית קיזוזים',
        [IProjectAccountsFields.AccountPeriod]: 'חשבון נוכחי',
        [IProjectAccountsFields.AccountToPay]: 'תשלום תק׳ נוכחית',
        [IProjectAccountsFields.ContractSum]: 'סכום הסכם',
        [IProjectAccountsFields.TotalAdditionsSubtractions]: 'תוספות וקיזוזים',
        [IProjectAccountsFields.TotalToPay]: 'יתרה לתשלום',
        [IProjectAccountsFields.PaidPercentage]: '% ששולם',
      },
      confirms: {
        [IAccountConfirms.Start]: 'אתחול ועדכון',
        [IAccountConfirms.Projectmanager]: 'אישור מ.פרוייקט',
        [IAccountConfirms.Manager]: 'אישור מהנדס חברה/מנכ״ל',
        [IAccountConfirms.Accounting]: 'אישור הנה״ח',
        [IAccountConfirms.Financing]: 'אישור כספים',
        [IAccountConfirms.ExternalSoftware]: 'הזנה לסאפ',
        [IAccountConfirms.Billing]: 'צ׳ק מאושר',
      },
    },
    en: {
      fields: {
        [IProjectAccountsFields.Contract]: 'Contract',
        [IProjectAccountsFields.Vendor]: 'Vendor',
        [IProjectAccountsFields.AccumulatedTotal]: 'Accumulated Total',
        [IProjectAccountsFields.AccumulatedHisotry]: 'Accumulated Hisotry',
        [IProjectAccountsFields.AccountAdditions]: 'Additions',
        [IProjectAccountsFields.AccountSubtractions]: 'Subtractions',
        [IProjectAccountsFields.AccountPeriod]: 'Period',
        [IProjectAccountsFields.AccountToPay]: 'Account To Pay',
        [IProjectAccountsFields.ContractSum]: 'Contract Sum',
        [IProjectAccountsFields.TotalAdditionsSubtractions]:
          'Total Additions Subtractions',
        [IProjectAccountsFields.TotalToPay]: 'Total To Pay',
        [IProjectAccountsFields.PaidPercentage]: 'Paid %',
      },
      confirms: {
        [IAccountConfirms.Start]: 'Account Init',
        [IAccountConfirms.Projectmanager]: 'Project Manager Approve',
        [IAccountConfirms.Manager]: 'Senior Manager Approve',
        [IAccountConfirms.Accounting]: 'Accounting Approve',
        [IAccountConfirms.Financing]: 'Financing Approve',
        [IAccountConfirms.ExternalSoftware]: 'Entered To SAP',
        [IAccountConfirms.Billing]: 'Billing Ready',
      },
    },
  };
