import Z from 'zod';
import { WithCommonFields } from '@/lib/utils/WithFields';
import { IProjectAttahcmentFields } from './ProjectAttachmentFields';
import {
  OPTIONAL_DATE_SCHEMA,
  OPTIONAL_NUMBER_SCHEMA,
  OPTIONAL_STRING_SCHEMA,
  TITLE_FIELD_SCHEMA,
} from '../validation/validationSchema';
import { IProjectAttahcmentStatus } from './ProjectAttachmentStatus';

export const ProjectAttachmentDoc = Z.object({
  [IProjectAttahcmentFields.Title]: TITLE_FIELD_SCHEMA,
  [IProjectAttahcmentFields.Description]: OPTIONAL_STRING_SCHEMA,
  [IProjectAttahcmentFields.Status]: Z.nativeEnum(
    IProjectAttahcmentStatus,
  ).optional(),
  [IProjectAttahcmentFields.AttachmentUrl]: OPTIONAL_STRING_SCHEMA,
});

export type IProjectAttachmentDoc = WithCommonFields<
  Z.infer<typeof ProjectAttachmentDoc>
>;
