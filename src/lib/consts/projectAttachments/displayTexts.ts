import { Lang } from '../displayTexts';
import { IProjectAttahcmentStatus } from './ProjectAttachmentStatus';
import { IProjectAttahcmentFields } from './ProjectAttachmentFields';

type IDisplayTextMapping = {
  fields: Record<IProjectAttahcmentFields, string>;
  status: Record<IProjectAttahcmentStatus, string>;
};

export const PROJECT_ATTACHMENTS_DISPLAY_TEXTS: Record<
  Lang,
  DisplayTextMapping
> = {
  he: {
    fields: {
      [IProjectAttahcmentFields.Title]: 'עבודה',
      [IProjectAttahcmentFields.Description]: 'תיאור',
      [IProjectAttahcmentFields.Status]: 'סטטוס',
      [IProjectAttahcmentFields.AttachmentUrl]: 'קובץ',
    },
    status: {
      [IProjectAttahcmentStatus.Open]: 'פתוח',
      [IProjectAttahcmentStatus.Done]: 'טופל',
      [IProjectAttahcmentStatus.Archive]: 'ארכיון',
    },
  },
  en: {
    fields: {
      [IProjectAttahcmentFields.Title]: 'Job',
      [IProjectAttahcmentFields.Description]: 'Descriptions',
      [IProjectAttahcmentFields.Status]: 'Status',
      [IProjectAttahcmentFields.AttachmentUrl]: 'Attachment',
    },
    status: {
      [IProjectAttahcmentStatus.Open]: 'Open',
      [IProjectAttahcmentStatus.Done]: 'Done',
      [IProjectAttahcmentStatus.Archive]: 'Archive',
    },
  },
};
