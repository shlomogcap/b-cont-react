import { ILang } from '../displayTexts';
import { EProjectAttahcmentStatus } from './ProjectAttachmentStatus';
import { EProjectAttahcmentFields } from './ProjectAttachmentFields';

type IDisplayTextMapping = {
  fields: Record<EProjectAttahcmentFields, string>;
  status: Record<EProjectAttahcmentStatus, string>;
};

export const PROJECT_ATTACHMENTS_DISPLAY_TEXTS: Record<
  ILang,
  IDisplayTextMapping
> = {
  he: {
    fields: {
      [EProjectAttahcmentFields.Title]: 'עבודה',
      [EProjectAttahcmentFields.Description]: 'תיאור',
      [EProjectAttahcmentFields.Status]: 'סטטוס',
      [EProjectAttahcmentFields.AttachmentUrl]: 'קובץ',
    },
    status: {
      [EProjectAttahcmentStatus.Open]: 'פתוח',
      [EProjectAttahcmentStatus.Done]: 'טופל',
      [EProjectAttahcmentStatus.Archive]: 'ארכיון',
    },
  },
  en: {
    fields: {
      [EProjectAttahcmentFields.Title]: 'Job',
      [EProjectAttahcmentFields.Description]: 'Descriptions',
      [EProjectAttahcmentFields.Status]: 'Status',
      [EProjectAttahcmentFields.AttachmentUrl]: 'Attachment',
    },
    status: {
      [EProjectAttahcmentStatus.Open]: 'Open',
      [EProjectAttahcmentStatus.Done]: 'Done',
      [EProjectAttahcmentStatus.Archive]: 'Archive',
    },
  },
};
