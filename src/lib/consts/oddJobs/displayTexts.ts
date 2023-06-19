import { Lang } from '../displayTexts';
import { IOddJobStatus } from './OddJobStatus';
import { IOddJobsFields } from './OddJobsFields';

type IDisplayTextMapping = {
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
      [IOddJobsFields.InvoiceNumber]: 'מספר חשבונית',
      [IOddJobsFields.InvoiceDate]: 'תאריך חשבונית',
      [IOddJobsFields.SumBeforeTax]: 'סכום לפני מעמ',
      [IOddJobsFields.ApprovalSumBeforeTax]: 'סכום מאושר לפני מעמ',
      [IOddJobsFields.PaymentDue]: 'יתרה לתשלום',
      [IOddJobsFields.PaymentDate]: 'שולם',
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
      [IOddJobsFields.InvoiceNumber]: 'Invoice Number',
      [IOddJobsFields.InvoiceDate]: 'Invoice Date',
      [IOddJobsFields.SumBeforeTax]: 'Sum Before Tax',
      [IOddJobsFields.ApprovalSumBeforeTax]: 'Approval Sum Before Tax',
      [IOddJobsFields.PaymentDue]: 'Payment Due',
      [IOddJobsFields.PaymentDate]: 'Payment Date',
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
