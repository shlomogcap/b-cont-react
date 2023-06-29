import { Lang } from '../displayTexts';
import { EWorkspaceFields } from './WorkspaceFields';

type DisplayTextMapping = {
  fields: Record<EWorkspaceFields, string>;
};

export const WORKSPACES_DISPALY_TEXTS: Record<Lang, DisplayTextMapping> = {
  he: {
    fields: {
      [EWorkspaceFields.Title]: 'איזור עבודה',
      [EWorkspaceFields.OrderIndex]: '# איזור עבודה',
      [EWorkspaceFields.Description]: 'תיאור',
      [EWorkspaceFields.Parent]: 'שיוך ל',
      [EWorkspaceFields.EntityType]: 'סוג ישות',
      [EWorkspaceFields.InstrumentRef]: 'קישור לאובייקט',
      [EWorkspaceFields.ChildrenRefs]: 'תתי איזורי עבודה',
    },
  },
  en: {
    fields: {
      [EWorkspaceFields.Title]: 'Section',
      [EWorkspaceFields.OrderIndex]: '# Index',
      [EWorkspaceFields.Description]: 'Description',
      [EWorkspaceFields.Parent]: 'Parent',
      [EWorkspaceFields.EntityType]: 'Entity Type',
      [EWorkspaceFields.InstrumentRef]: 'Instrument Ref',
      [EWorkspaceFields.ChildrenRefs]: 'Sub Workspaces',
    },
  },
};
