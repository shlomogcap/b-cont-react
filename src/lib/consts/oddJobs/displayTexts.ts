import { ILang } from '../displayTexts';
import { EOddJobStatus } from './OddJobStatus';
import { EOddJobsFields } from './OddJobsFields';

type IDisplayTextMapping = {
  fields: Record<EOddJobsFields, string>;
  status: Record<EOddJobStatus, string>;
};

export const ODD_JOBS_DISPLAY_TEXTS: Record<ILang, IDisplayTextMapping> = {
  he: {
    fields: {
      [EOddJobsFields.Title]: 'עבודה',
      [EOddJobsFields.Description]: 'תיאור',
      [EOddJobsFields.Status]: 'סטטוס',
      [EOddJobsFields.AttachmentUrl]: 'קובץ',
      [EOddJobsFields.InvoiceNumber]: 'מספר חשבונית',
      [EOddJobsFields.InvoiceDate]: 'תאריך חשבונית',
      [EOddJobsFields.SumBeforeTax]: 'סכום לפני מעמ',
      [EOddJobsFields.ApprovalSumBeforeTax]: 'סכום מאושר לפני מעמ',
      [EOddJobsFields.PaymentDue]: 'יתרה לתשלום',
      [EOddJobsFields.PaymentDate]: 'שולם',
    },
    status: {
      [EOddJobStatus.Open]: 'פתוח',
      [EOddJobStatus.ProjectMangerConfirm]: 'מאושר מנהל פרוייקט',
      [EOddJobStatus.SeniorManagerConfirm]: 'מאושר הנהלה בכירה',
      [EOddJobStatus.PartiallyDone]: 'נסגר ושולם חלקי',
      [EOddJobStatus.Done]: 'נסגר ושולם מלא',
      [EOddJobStatus.NotConfirm]: 'לא אושר לתשלום',
      [EOddJobStatus.Archive]: 'ארכיון',
    },
  },
  en: {
    fields: {
      [EOddJobsFields.Title]: 'Job',
      [EOddJobsFields.Description]: 'Descriptions',
      [EOddJobsFields.Status]: 'Status',
      [EOddJobsFields.AttachmentUrl]: 'Attachment',
      [EOddJobsFields.InvoiceNumber]: 'Invoice Number',
      [EOddJobsFields.InvoiceDate]: 'Invoice Date',
      [EOddJobsFields.SumBeforeTax]: 'Sum Before Tax',
      [EOddJobsFields.ApprovalSumBeforeTax]: 'Approval Sum Before Tax',
      [EOddJobsFields.PaymentDue]: 'Payment Due',
      [EOddJobsFields.PaymentDate]: 'Payment Date',
    },
    status: {
      [EOddJobStatus.Open]: 'Open',
      [EOddJobStatus.ProjectMangerConfirm]: 'Project Manager Confirm',
      [EOddJobStatus.SeniorManagerConfirm]: 'Senior Manager Confirm',
      [EOddJobStatus.PartiallyDone]: 'Partially Done',
      [EOddJobStatus.Done]: 'Done',
      [EOddJobStatus.NotConfirm]: 'Not Conrim',
      [EOddJobStatus.Archive]: 'Archive',
    },
  },
};
