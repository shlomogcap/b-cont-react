import { ILang } from '../displayTexts';
import { ESectionFields } from './SectionFields';

type IDisplayTextMapping = {
  fields: Record<ESectionFields, string>;
};

export const SECTIONS_DISPALY_TEXTS: Record<ILang, IDisplayTextMapping> = {
  he: {
    fields: {
      [ESectionFields.Title]: 'סעיף',
      [ESectionFields.OrderIndex]: '# סעיף',
      [ESectionFields.CalculationMethod]: 'שיטת חישוב',
      [ESectionFields.AmountType]: 'סוג יח׳',
      [ESectionFields.CalculationType]: 'סוג אבן דרך',
      [ESectionFields.ItemsStartIndex]: 'אינדקס יח׳',
      [ESectionFields.SubTotal]: 'סכום ביצוע',
      [ESectionFields.DonePercentage]: 'אחוז ביצוע',
      [ESectionFields.WorkspacePath]: 'מיקום בתיקייה',
      [ESectionFields.ItemPrice]: 'מחיר',
      [ESectionFields.ItemsCount]: 'כמות',
      [ESectionFields.TotalSum]: 'סהכ',
      [ESectionFields.Description]: 'תיאור',
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
      [ESectionFields.SubTotal]: 'Sub Total',
      [ESectionFields.DonePercentage]: 'Done Percentage',
      [ESectionFields.WorkspacePath]: 'Workspace Path',
      [ESectionFields.ItemPrice]: 'Item Price',
      [ESectionFields.ItemsCount]: 'Items Count',
      [ESectionFields.TotalSum]: 'Total Sum',
      [ESectionFields.Description]: 'Description',
    },
  },
};
