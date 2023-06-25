import { ILang } from '../displayTexts';
import { EContractActualStatus } from './ContractActualStatus';
import { EContractFields } from './ContractFields';
import { EContractSectionItem } from './ContractSectionItem';
import { EContractStage } from './ContractStage';
import { EContractStatus } from './ContractStatus';
import { EContractType } from './ContractType';

type IDisplayTextMapping = {
  fields: Record<EContractFields, string>;
  contractFormTitle: string;
  contractType: Record<EContractType, string>;
  contractStage: Record<EContractStage, string>;
  contractStatus: Record<EContractStatus, string>;
  contractActualsStatus: Record<EContractActualStatus, string>;
  addNewItems: Record<EContractSectionItem, string>;
};

export const CONTRACTS_DISPLAY_TEXTS: Record<ILang, IDisplayTextMapping> = {
  he: {
    contractFormTitle: 'פרטי החוזה',
    addNewItems: {
      [EContractSectionItem.Section]: 'סעיף',
      [EContractSectionItem.Workspace]: 'איזור עבודה',
    },
    fields: {
      [EContractFields.Title]: 'חוזה',
      [EContractFields.Description]: 'תיאור',
      [EContractFields.BudgetbudgetaryItem]: 'סעיף תקציבי',
      [EContractFields.ActualsStatus]: 'תגית תהליך ביצוע',
      [EContractFields.VendorRef]: 'קבלן מבצע',
      [EContractFields.TotalAgreementSum]: 'סכום חוזה',
      [EContractFields.PaymentDelay]: 'תנאי תשלום (ש+)',
      [EContractFields.ContractType]: 'סוג חוזה',
      [EContractFields.DelayPercentage]: 'אחוז עיכבון',
      [EContractFields.Status]: 'סטטוס',
      [EContractFields.IsIndexed]: 'האם מוצמד?',
      [EContractFields.IndexedFactor]: 'הצמדה למדד',
      [EContractFields.CalculationMethod]: 'שיטת חישוב',
      [EContractFields.SWorkDate]: 'תחילת עבודה',
      [EContractFields.NumberOfPeriods]: 'מספר תקופות',
      [EContractFields.EWorkDate]: 'סיום עבודה',
      [EContractFields.DonePercentage]: 'אחוז ביצוע',
      [EContractFields.TotalActualsSum]: 'סכום ביצוע',
      [EContractFields.CurrentAccountPeriod]: 'חשבון נוכחי',
    },
    contractStage: {
      [EContractStage.Plan]: 'תכנון',
      [EContractStage.Actual]: 'ביצוע',
      [EContractStage.Billing]: 'כספים',
    },
    contractType: {
      [EContractType.Pauschal]: 'פאושלי',
      [EContractType.Amount]: 'כמויות',
      [EContractType.Rent]: 'שכירות',
      [EContractType.Invoice]: 'חשבוניות',
      [EContractType.Kitchen]: 'מטבחים ושיש',
    },
    contractStatus: {
      [EContractStatus.Plan]: 'בהקמה',
      [EContractStatus.Active]: 'פעיל',
      [EContractStatus.Done]: 'הסתיים',
      [EContractStatus.NonActive]: 'לא פעיל',
    },
    contractActualsStatus: {
      [EContractActualStatus.None]: '---',
      [EContractActualStatus.MissingProjectManagerConfirm]:
        'חסר אישור מ.פרוייקט',
      [EContractActualStatus.MissingSeniorManagerConfirm]: 'חסר אישור מנכ״ל',
      [EContractActualStatus.InCareOfAccounting]: 'בטיפול הנה״ח',
      [EContractActualStatus.InCareOfFinancing]: 'בטיפול כספים',
      [EContractActualStatus.MovedToDelayRelease]: 'עבר לשחרור עכבון',
      [EContractActualStatus.DelayNotReleased]: 'לא שוחרר עכבון',
      [EContractActualStatus.DelayReleased]: 'שוחרר עכבון',
      [EContractActualStatus.LackOfClaimsReceived]: 'התקבל העדר תביעות',
    },
  },
  en: {
    contractFormTitle: 'Contract Details',
    addNewItems: {
      [EContractSectionItem.Section]: '+ Section',
      [EContractSectionItem.Workspace]: '+ Workspace',
    },
    fields: {
      [EContractFields.Title]: 'Contract',
      [EContractFields.Description]: 'Description',
      [EContractFields.BudgetbudgetaryItem]: 'Budget #',
      [EContractFields.ActualsStatus]: 'Actuals Status',
      [EContractFields.VendorRef]: 'Vendor',
      [EContractFields.TotalAgreementSum]: 'Total Agreement Sum',
      [EContractFields.PaymentDelay]: 'Payment Delay Condition',
      [EContractFields.ContractType]: 'Contract Type',
      [EContractFields.DelayPercentage]: 'Delay Percentage',
      [EContractFields.Status]: 'Status',
      [EContractFields.IsIndexed]: 'Is Indexed?',
      [EContractFields.IndexedFactor]: 'Indexed Factor',
      [EContractFields.CalculationMethod]: 'Calculation Method',
      [EContractFields.SWorkDate]: 'Start Date',
      [EContractFields.NumberOfPeriods]: '# Periods',
      [EContractFields.EWorkDate]: 'End Date',
      [EContractFields.DonePercentage]: 'Done Percentage',
      [EContractFields.TotalActualsSum]: 'Total Actuals Sum',
      [EContractFields.CurrentAccountPeriod]: 'Current Account',
    },
    contractType: {
      [EContractType.Pauschal]: 'Pauschal',
      [EContractType.Amount]: 'Amount',
      [EContractType.Rent]: 'Rent',
      [EContractType.Invoice]: 'Invoice',
      [EContractType.Kitchen]: 'Kitchen',
    },
    contractStage: {
      [EContractStage.Plan]: 'Plan',
      [EContractStage.Actual]: 'Actual',
      [EContractStage.Billing]: 'Billing',
    },
    contractStatus: {
      [EContractStatus.Plan]: 'Plan',
      [EContractStatus.Active]: 'Active',
      [EContractStatus.Done]: 'Done',
      [EContractStatus.NonActive]: 'Not Active',
    },
    contractActualsStatus: {
      [EContractActualStatus.None]: 'None',
      [EContractActualStatus.MissingProjectManagerConfirm]:
        'Missing Project Manager Approval',
      [EContractActualStatus.MissingSeniorManagerConfirm]:
        'Missing Senior Manager Approval',
      [EContractActualStatus.InCareOfAccounting]: 'In Care Of Accounting',
      [EContractActualStatus.InCareOfFinancing]: 'In Care Of Financing',
      [EContractActualStatus.MovedToDelayRelease]: 'Moved To Delay Release',
      [EContractActualStatus.DelayNotReleased]: 'Delay Pending Release',
      [EContractActualStatus.DelayReleased]: 'Delay Release',
      [EContractActualStatus.LackOfClaimsReceived]:
        'A Lack Of Claims Was Received',
    },
  },
};
