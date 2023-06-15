import { WithCommonFields } from '@/lib/utils/WithFields';
import Z from 'zod';
import { EWorkspaceFields } from './WorkspaceFields';
import {
  OPTIONAL_STRING_SCHEMA,
  TITLE_FIELD_SCHEMA,
} from '../validation/validationSchema';
import { EWorkspaceEntityType } from './WorkspaceEntityType';

export const WorkspaceDoc = Z.object({
  [EWorkspaceFields.Title]: TITLE_FIELD_SCHEMA,
  [EWorkspaceFields.Description]: OPTIONAL_STRING_SCHEMA,
  [EWorkspaceFields.Parent]: OPTIONAL_STRING_SCHEMA,
  [EWorkspaceFields.EntityType]: Z.nativeEnum(EWorkspaceEntityType),
  [EWorkspaceFields.InstrumentRef]: OPTIONAL_STRING_SCHEMA,
});

export type IWorkspaceDoc = WithCommonFields<Z.infer<typeof WorkspaceDoc>>;
