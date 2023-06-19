import { Lang } from '../displayTexts';
import { IContractActualStatus } from './ContractActualStatus';
import { IContractFields } from './ContractFields';
import { IContractStage } from './ContractStage';
import { IContractStatus } from './ContractStatus';
import { IContractType } from './ContractType';

type IDisplayTextMapping = {
  fields: Record<IContractFields, string>;
  contractFormTitle: string;
  contractType: Record<IContractType, string>;
  contractStage: Record<IContractStage, string>;
  contractStatus: Record<IContractStatus, string>;
  contractActualsStatus: Record<IContractActualStatus, string>;
};

export const CONTRACTS_DISPLAY_TEXTS: Record<Lang, DisplayTextMapping> = {
  he: {
    contractFormTitle: 'פרטי החוזה',
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
      [IContractFields.CurrentAccountPeriod]: 'חשבון נוכחי',
    },
    contractStage: {
      [IContractStage.Plan]: 'תכנון',
      [IContractStage.Actual]: 'ביצוע',
      [IContractStage.Billing]: 'כספים',
    },
    contractType: {
      [IContractType.Pauschal]: 'פאושלי',
      [IContractType.Amount]: 'כמויות',
      [IContractType.Rent]: 'שכירות',
      [IContractType.Invoice]: 'חשבוניות',
      [IContractType.Kitchen]: 'מטבחים ושיש',
    },
    contractStatus: {
      [IContractStatus.Plan]: 'בהקמה',
      [IContractStatus.Active]: 'פעיל',
      [IContractStatus.Done]: 'הסתיים',
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
    contractFormTitle: 'Contract Details',
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
      [IContractFields.CurrentAccountPeriod]: 'Current Account',
    },
    contractType: {
      [IContractType.Pauschal]: 'Pauschal',
      [IContractType.Amount]: 'Amount',
      [IContractType.Rent]: 'Rent',
      [IContractType.Invoice]: 'Invoice',
      [IContractType.Kitchen]: 'Kitchen',
    },
    contractStage: {
      [IContractStage.Plan]: 'Plan',
      [IContractStage.Actual]: 'Actual',
      [IContractStage.Billing]: 'Billing',
    },
    contractStatus: {
      [IContractStatus.Plan]: 'Plan',
      [IContractStatus.Active]: 'Active',
      [IContractStatus.Done]: 'Done',
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
