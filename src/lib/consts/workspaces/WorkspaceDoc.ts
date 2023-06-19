import { WithCommonFields } from '@/lib/utils/WithFields';
import Z, { literal } from 'zod';
import { EWorkspaceFields } from './WorkspaceFields';
import {
  OPTIONAL_STRING_SCHEMA,
  TITLE_FIELD_SCHEMA,
} from '../validation/validationSchema';
import { EWorkspaceEntityType } from './WorkspaceEntityType';

export const WorkspaceGroupDoc = Z.object({
  [EWorkspaceFields.Title]: TITLE_FIELD_SCHEMA,
  [EWorkspaceFields.Description]: OPTIONAL_STRING_SCHEMA,
  [EWorkspaceFields.Parent]: OPTIONAL_STRING_SCHEMA,
  [EWorkspaceFields.EntityType]: Z.nativeEnum(EWorkspaceEntityType),
  [EWorkspaceFields.InstrumentRef]: OPTIONAL_STRING_SCHEMA,
});

export const WorkspaceDoc = WorkspaceGroupDoc.extend({
  [EWorkspaceFields.EntityType]: literal(EWorkspaceEntityType.Workspace),
});
export const GroupDoc = WorkspaceGroupDoc.extend({
  [EWorkspaceFields.EntityType]: literal(EWorkspaceEntityType.Group),
});

export type IWorkspaceGroupDoc = WithCommonFields<
  Z.infer<typeof WorkspaceGroupDoc>
>;
export type IWorkspaceDoc = WithCommonFields<Z.infer<typeof WorkspaceDoc>>;
export type IGroupDoc = WithCommonFields<Z.infer<typeof GroupDoc>>;
