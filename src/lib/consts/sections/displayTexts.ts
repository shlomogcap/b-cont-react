import { Lang } from '../displayTexts';
import { ESectionCalculationMethod } from './SectionCalculationMethod';
import { ESectionCalculationType } from './SectionCalculationType';
import { ESectionFields } from './SectionFields';

export enum ESectionActions {
  AddUnit,
  AddMilestone,
  ShowPreview,
  HidePreview,
}

type DisplayTextMapping = {
  fields: Record<ESectionFields, string>;
  calculationMethod: Record<ESectionCalculationMethod, string>;
  calculationType: Record<ESectionCalculationType, string>;
  actions: Record<ESectionActions, string>;
};

export const SECTIONS_DISPALY_TEXTS: Record<Lang, DisplayTextMapping> = {
  he: {
    fields: {
      [ESectionFields.Title]: 'סעיף',
      [ESectionFields.OrderIndex]: '# סעיף',
      [ESectionFields.CalculationMethod]: 'שיטת חישוב',
      [ESectionFields.AmountType]: 'סוג יח׳',
      [ESectionFields.CalculationType]: 'סוג אבן דרך',
      [ESectionFields.ItemsStartIndex]: 'אינדקס יח׳',
      [ESectionFields.TotalActualsSum]: 'סכום ביצוע',
      [ESectionFields.DonePercentage]: 'אחוז ביצוע',
      [ESectionFields.WorkspaceRef]: 'איזור עבודה',
      [ESectionFields.ItemPrice]: 'מחיר',
      [ESectionFields.ItemsCount]: 'כמות',
      [ESectionFields.TotalSum]: 'סהכ',
      [ESectionFields.Description]: 'תיאור',
    },
    calculationMethod: {
      [ESectionCalculationMethod.Pauschal]: 'פאושלי',
      [ESectionCalculationMethod.Amount]: 'כמותי',
      [ESectionCalculationMethod.Apartments]: 'דירות',
    },
    calculationType: {
      [ESectionCalculationType.Numeric]: 'כמויות',
      [ESectionCalculationType.Percentage]: 'אחוזים',
    },
    actions: {
      [ESectionActions.AddUnit]: 'הוסף יחידה',
      [ESectionActions.AddMilestone]: 'הוסף אבן דרך של יחידה',
      [ESectionActions.ShowPreview]: 'תצוגה מקדימה',
      [ESectionActions.HidePreview]: 'תצוגת עריכה',
    },
  },
  en: {
    fields: {
      [ESectionFields.Title]: 'Section',
      [ESectionFields.OrderIndex]: '# Index',
      [ESectionFields.CalculationMethod]: 'Calculation Method',
      [ESectionFields.AmountType]: 'Amount Type',
      [ESectionFields.CalculationType]: 'Calculation Type',
      [ESectionFields.ItemsStartIndex]: 'Items Start Index',
      [ESectionFields.TotalActualsSum]: 'Sub Total',
      [ESectionFields.DonePercentage]: 'Done Percentage',
      [ESectionFields.WorkspaceRef]: 'Workspace Path',
      [ESectionFields.ItemPrice]: 'Item Price',
      [ESectionFields.ItemsCount]: 'Items Count',
      [ESectionFields.TotalSum]: 'Total Sum',
      [ESectionFields.Description]: 'Description',
    },
    calculationMethod: {
      [ESectionCalculationMethod.Pauschal]: 'Pauschal',
      [ESectionCalculationMethod.Amount]: 'Amount',
      [ESectionCalculationMethod.Apartments]: 'Apartments',
    },
    calculationType: {
      [ESectionCalculationType.Numeric]: 'Numeric',
      [ESectionCalculationType.Percentage]: 'Percentage',
    },
    actions: {
      [ESectionActions.AddUnit]: 'Add Unit',
      [ESectionActions.AddMilestone]: 'Add Milestone',
      [ESectionActions.ShowPreview]: 'Show Preview',
      [ESectionActions.HidePreview]: ' Preview',
    },
  },
};
