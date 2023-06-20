import { WithCommonFields } from '@/lib/utils/WithFields';
import Z from 'zod';
import { EWorkspaceFields } from './WorkspaceFields';
import {
  INTEGER_SCHEMA,
  OPTIONAL_STRING_SCHEMA,
  TITLE_FIELD_SCHEMA,
} from '../validation/validationSchema';

export const WorkspaceDoc = Z.object({
  [EWorkspaceFields.Title]: TITLE_FIELD_SCHEMA,
  [EWorkspaceFields.Description]: OPTIONAL_STRING_SCHEMA,
  [EWorkspaceFields.Parent]: OPTIONAL_STRING_SCHEMA,
  [EWorkspaceFields.OrderIndex]: INTEGER_SCHEMA,
  [EWorkspaceFields.InstrumentRef]: OPTIONAL_STRING_SCHEMA,
  [EWorkspaceFields.ChildrenRefs]: Z.array(Z.string()),
}).refine((data) => {
  const parent = data[EWorkspaceFields.Parent];
  const childrenRefs = data[EWorkspaceFields.ChildrenRefs];
  return parent === undefined || parent === '' || childrenRefs.length === 0;
}, 'Cannot have both parent and childrenRefs on same workspace');

export type IWorkspaceDoc = WithCommonFields<Z.infer<typeof WorkspaceDoc>>;
