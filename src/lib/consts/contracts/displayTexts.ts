import { Lang } from '../displayTexts';
import { IContractActualStatus } from './ContractActualStatus';
import { IContractFields } from './ContractFields';
import { IContractStatus } from './ContractStatus';
import { IContractType } from './ContractType';

type DisplayTextMapping = {
  fields: Record<IContractFields, string>;
  contractType: Record<IContractType, string>;
  contractStatus: Record<IContractStatus, string>;
  contractActualsStatus: Record<IContractActualStatus, string>;
};

export const CONTRACTS_DISPLAY_TEXTS: Record<Lang, DisplayTextMapping> = {
  he: {
    fields: {
      [IContractFields.Title]: 'חוזה',
      [IContractFields.Description]: 'תיאור',
      [IContractFields.BudgetbudgetaryItem]: 'סעיף תקציבי',
      [IContractFields.ActualsStatus]: 'תגית תהליך ביצוע',
      [IContractFields.VendorRef]: 'קבלן מבצע',
      [IContractFields.TotalAgreementSum]: 'סכום חוזה',
      [IContractFields.PaymentDelay]: 'תנאי תשלום (ש+)',
      [IContractFields.ContractType]: 'סוג חוזה',
      [IContractFields.DelayPercentage]: 'אחוז עיכבון',
      [IContractFields.Status]: 'סטטוס',
      [IContractFields.IsIndexed]: 'האם מוצמד?',
      [IContractFields.IndexedFactor]: 'הצמדה למדד',
      [IContractFields.CalculationMethod]: 'שיטת חישוב',
      [IContractFields.SWorkDate]: 'תחילת עבודה',
      [IContractFields.NumberOfPeriods]: 'מספר תקופות',
      [IContractFields.EWorkDate]: 'סיום עבודה',
      [IContractFields.DonePercentage]: 'אחוז ביצוע',
      [IContractFields.TotalActualsSum]: 'סכום ביצוע',
    },
    contractType: {
      [IContractType.Pauschal]: 'פאושלי',
      [IContractType.Amount]: 'כמויות',
      [IContractType.Rent]: 'שכירות',
      [IContractType.Invoice]: 'חשבוניות',
      [IContractType.Kitchen]: 'מטבחים ושיש',
    },
    contractStatus: {
      [IContractStatus.Active]: 'פעיל',
      [IContractStatus.NonActive]: 'לא פעיל',
    },
    contractActualsStatus: {
      [IContractActualStatus.None]: '---',
      [IContractActualStatus.MissingProjectManagerConfirm]:
        'חסר אישור מ.פרוייקט',
      [IContractActualStatus.MissingSeniorManagerConfirm]: 'חסר אישור מנכ״ל',
      [IContractActualStatus.InCareOfAccounting]: 'בטיפול הנה״ח',
      [IContractActualStatus.InCareOfFinancing]: 'בטיפול כספים',
      [IContractActualStatus.MovedToDelayRelease]: 'עבר לשחרור עכבון',
      [IContractActualStatus.DelayNotReleased]: 'לא שוחרר עכבון',
      [IContractActualStatus.DelayReleased]: 'שוחרר עכבון',
      [IContractActualStatus.LackOfClaimsReceived]: 'התקבל העדר תביעות',
    },
  },
  en: {
    fields: {
      [IContractFields.Title]: 'Contract',
      [IContractFields.Description]: 'Description',
      [IContractFields.BudgetbudgetaryItem]: 'Budget #',
      [IContractFields.ActualsStatus]: 'Actuals Status',
      [IContractFields.VendorRef]: 'Vendor',
      [IContractFields.TotalAgreementSum]: 'Total Agreement Sum',
      [IContractFields.PaymentDelay]: 'Payment Delay Condition',
      [IContractFields.ContractType]: 'Contract Type',
      [IContractFields.DelayPercentage]: 'Delay Percentage',
      [IContractFields.Status]: 'Status',
      [IContractFields.IsIndexed]: 'Is Indexed?',
      [IContractFields.IndexedFactor]: 'Indexed Factor',
      [IContractFields.CalculationMethod]: 'Calculation Method',
      [IContractFields.SWorkDate]: 'Start Date',
      [IContractFields.NumberOfPeriods]: '# Periods',
      [IContractFields.EWorkDate]: 'End Date',
      [IContractFields.DonePercentage]: 'Done Percentage',
      [IContractFields.TotalActualsSum]: 'Total Actuals Sum',
    },
    contractType: {
      [IContractType.Pauschal]: 'Pauschal',
      [IContractType.Amount]: 'Amount',
      [IContractType.Rent]: 'Rent',
      [IContractType.Invoice]: 'Invoice',
      [IContractType.Kitchen]: 'Kitchen',
    },
    contractStatus: {
      [IContractStatus.Active]: 'Active',
      [IContractStatus.NonActive]: 'Not Active',
    },
    contractActualsStatus: {
      [IContractActualStatus.None]: 'None',
      [IContractActualStatus.MissingProjectManagerConfirm]:
        'Missing Project Manager Approval',
      [IContractActualStatus.MissingSeniorManagerConfirm]:
        'Missing Senior Manager Approval',
      [IContractActualStatus.InCareOfAccounting]: 'In Care Of Accounting',
      [IContractActualStatus.InCareOfFinancing]: 'In Care Of Financing',
      [IContractActualStatus.MovedToDelayRelease]: 'Moved To Delay Release',
      [IContractActualStatus.DelayNotReleased]: 'Delay Pending Release',
      [IContractActualStatus.DelayReleased]: 'Delay Release',
      [IContractActualStatus.LackOfClaimsReceived]:
        'A Lack Of Claims Was Received',
    },
  },
};
