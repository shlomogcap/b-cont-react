import { Lang } from '../displayTexts';
import { EMilestoneFields } from './MilestoneFields';

type DisplayTextMapping = {
  fields: Record<EMilestoneFields, string>;
};

export const SECTIONS_DISPALY_TEXTS: Record<Lang, DisplayTextMapping> = {
  he: {
    fields: {
      [EMilestoneFields.Title]: 'אבן דרך של יחידה',
      [EMilestoneFields.OrderIndex]: '#',
      [EMilestoneFields.Weight]: 'משקל באחוזים',
      [EMilestoneFields.Price]: 'סכום',
      [EMilestoneFields.TotalDone]: 'סהכ בוצע',
    },
  },
  en: {
    fields: {
      [EMilestoneFields.Title]: 'Title',
      [EMilestoneFields.OrderIndex]: '#',
      [EMilestoneFields.Weight]: 'Weight',
      [EMilestoneFields.Price]: 'Price',
      [EMilestoneFields.TotalDone]: 'Total Done',
    },
  },
};
