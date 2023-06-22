import { z } from 'zod';
import { WithCommonFields } from '@/lib/utils/WithFields';
import { IProjectAttahcmentFields } from './ProjectAttachmentFields';
import {
  OPTIONAL_DATE_SCHEMA,
  OPTIONAL_NUMBER_SCHEMA,
  OPTIONAL_STRING_SCHEMA,
  TITLE_FIELD_SCHEMA,
} from '../validation/validationSchema';
import { IProjectAttahcmentStatus } from './ProjectAttachmentStatus';

export const ProjectAttachmentDoc = z.object({
  [IProjectAttahcmentFields.Title]: TITLE_FIELD_SCHEMA,
  [IProjectAttahcmentFields.Description]: OPTIONAL_STRING_SCHEMA,
  [IProjectAttahcmentFields.Status]: z
    .nativeEnum(IProjectAttahcmentStatus)
    .optional(),
  [IProjectAttahcmentFields.AttachmentUrl]: OPTIONAL_STRING_SCHEMA,
});

export type IProjectAttachmentDoc = WithCommonFields<
  z.infer<typeof ProjectAttachmentDoc>
>;
