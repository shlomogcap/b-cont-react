import { Lang } from '../displayTexts';
import { IProjectAccountsFields } from './ProjectAccountFields';

type DisplayTextMapping = {
  fields: Record<IProjectAccountsFields, string>;
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
    },
  };
