import { z } from 'zod';
import { IWithCommonFields } from '@/lib/utils/WithFields';
import { EProjectAttahcmentFields } from './ProjectAttachmentFields';
import {
  OPTIONAL_STRING_SCHEMA,
  TITLE_FIELD_SCHEMA,
} from '../validation/validationSchema';
import { EProjectAttahcmentStatus } from './ProjectAttachmentStatus';

export const ProjectAttachmentDoc = z.object({
  [EProjectAttahcmentFields.Title]: TITLE_FIELD_SCHEMA,
  [EProjectAttahcmentFields.Description]: OPTIONAL_STRING_SCHEMA,
  [EProjectAttahcmentFields.Status]: z
    .nativeEnum(EProjectAttahcmentStatus)
    .optional(),
  [EProjectAttahcmentFields.AttachmentUrl]: OPTIONAL_STRING_SCHEMA,
});

export type IProjectAttachmentDoc = IWithCommonFields<
  z.infer<typeof ProjectAttachmentDoc>
>;
