import { Lang } from '../displayTexts';
import { IOddJobStatus } from './OddJobStatus';
import { IOddJobsFields } from './OddJobsFields';

type DisplayTextMapping = {
  fields: Record<IOddJobsFields, string>;
  status: Record<IOddJobStatus, string>;
};

export const ODD_JOBS_DISPLAY_TEXTS: Record<Lang, DisplayTextMapping> = {
  he: {
    fields: {
      [IOddJobsFields.Title]: 'עבודה',
      [IOddJobsFields.Description]: 'תיאור',
      [IOddJobsFields.Status]: 'סטטוס',
      [IOddJobsFields.AttachmentUrl]: 'קובץ',
    },
    status: {
      [IOddJobStatus.Open]: 'פתוח',
      [IOddJobStatus.ProjectMangerConfirm]: 'מאושר מנהל פרוייקט',
      [IOddJobStatus.SeniorManagerConfirm]: 'מאושר הנהלה בכירה',
      [IOddJobStatus.PartiallyDone]: 'נסגר ושולם חלקי',
      [IOddJobStatus.Done]: 'נסגר ושולם מלא',
      [IOddJobStatus.NotConfirm]: 'לא אושר לתשלום',
      [IOddJobStatus.Archive]: 'ארכיון',
    },
  },
  en: {
    fields: {
      [IOddJobsFields.Title]: 'Job',
      [IOddJobsFields.Description]: 'Descriptions',
      [IOddJobsFields.Status]: 'Status',
      [IOddJobsFields.AttachmentUrl]: 'Attachment',
    },
    status: {
      [IOddJobStatus.Open]: 'Open',
      [IOddJobStatus.ProjectMangerConfirm]: 'Project Manager Confirm',
      [IOddJobStatus.SeniorManagerConfirm]: 'Senior Manager Confirm',
      [IOddJobStatus.PartiallyDone]: 'Partially Done',
      [IOddJobStatus.Done]: 'Done',
      [IOddJobStatus.NotConfirm]: 'Not Conrim',
      [IOddJobStatus.Archive]: 'Archive',
    },
  },
};
