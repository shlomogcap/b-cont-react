import Z from 'zod';
import { IWithCommonFields } from '@/lib/utils/WithFields';
import { EOddJobsFields } from './OddJobsFields';
import {
  OPTIONAL_DATE_SCHEMA,
  OPTIONAL_NUMBER_SCHEMA,
  OPTIONAL_STRING_SCHEMA,
  TITLE_FIELD_SCHEMA,
} from '../validation/validationSchema';
import { EOddJobStatus } from './OddJobStatus';

export const OddJobDoc = Z.object({
  [EOddJobsFields.Title]: TITLE_FIELD_SCHEMA,
  [EOddJobsFields.Description]: OPTIONAL_STRING_SCHEMA,
  [EOddJobsFields.Status]: Z.nativeEnum(EOddJobStatus).optional(),
  [EOddJobsFields.AttachmentUrl]: OPTIONAL_STRING_SCHEMA,
  [EOddJobsFields.InvoiceNumber]: OPTIONAL_STRING_SCHEMA,
  [EOddJobsFields.InvoiceDate]: OPTIONAL_DATE_SCHEMA,
  [EOddJobsFields.SumBeforeTax]: OPTIONAL_NUMBER_SCHEMA,
  [EOddJobsFields.ApprovalSumBeforeTax]: OPTIONAL_NUMBER_SCHEMA,
  [EOddJobsFields.PaymentDue]: OPTIONAL_NUMBER_SCHEMA,
  [EOddJobsFields.PaymentDate]: OPTIONAL_DATE_SCHEMA,
});

export type IOddJobDoc = IWithCommonFields<Z.infer<typeof OddJobDoc>>;
