import Z from 'zod';
import { IWithCommonFields } from '@/lib/utils/WithFields';
import { EProjectAttahcmentFields } from './ProjectAttachmentFields';
import {
  OPTIONAL_DATE_SCHEMA,
  OPTIONAL_NUMBER_SCHEMA,
  OPTIONAL_STRING_SCHEMA,
  TITLE_FIELD_SCHEMA,
} from '../validation/validationSchema';
import { EProjectAttahcmentStatus } from './ProjectAttachmentStatus';

export const ProjectAttachmentDoc = Z.object({
  [EProjectAttahcmentFields.Title]: TITLE_FIELD_SCHEMA,
  [EProjectAttahcmentFields.Description]: OPTIONAL_STRING_SCHEMA,
  [EProjectAttahcmentFields.Status]: Z.nativeEnum(
    EProjectAttahcmentStatus,
  ).optional(),
  [EProjectAttahcmentFields.AttachmentUrl]: OPTIONAL_STRING_SCHEMA,
});

export type IProjectAttachmentDoc = IWithCommonFields<
  Z.infer<typeof ProjectAttachmentDoc>
>;
