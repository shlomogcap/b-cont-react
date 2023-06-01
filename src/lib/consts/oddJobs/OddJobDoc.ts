import Z from 'zod';
import { WithCommonFields } from '@/lib/utils/WithFields';
import { IOddJobsFields } from './OddJobsFields';
import {
  OPTIONAL_STRING_SCHEMA,
  TITLE_FIELD_SCHEMA,
} from '../validation/validationSchema';
import { IOddJobStatus } from './OddJobStatus';

export const OddJobDoc = Z.object({
  [IOddJobsFields.Title]: TITLE_FIELD_SCHEMA,
  [IOddJobsFields.Description]: OPTIONAL_STRING_SCHEMA,
  [IOddJobsFields.Status]: Z.nativeEnum(IOddJobStatus).optional(),
  [IOddJobsFields.AttachmentUrl]: OPTIONAL_STRING_SCHEMA,
});

export type IOddJobDoc = WithCommonFields<Z.infer<typeof OddJobDoc>>;
