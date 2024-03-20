import { ILang } from '../displayTexts';
import { EMilestoneFields } from './MilestoneFields';

type DisplayTextMapping = {
  fields: Record<EMilestoneFields, string>;
  subTotal: string;
  total: string;
};

export const MILESTONES_DISPALY_TEXTS: Record<ILang, DisplayTextMapping> = {
  he: {
    fields: {
      [EMilestoneFields.Title]: 'אבן דרך של יחידה',
      [EMilestoneFields.OrderIndex]: '#',
      [EMilestoneFields.Weight]: 'משקל באחוזים',
      [EMilestoneFields.Price]: 'סכום',
      [EMilestoneFields.TotalDone]: 'סהכ בוצע',
    },
    subTotal: 'סיכום',
    total: 'סהכ',
  },
  en: {
    fields: {
      [EMilestoneFields.Title]: 'Title',
      [EMilestoneFields.OrderIndex]: '#',
      [EMilestoneFields.Weight]: 'Weight',
      [EMilestoneFields.Price]: 'Price',
      [EMilestoneFields.TotalDone]: 'Total Done',
    },
    subTotal: 'SubTotal',
    total: 'Total',
  },
};
