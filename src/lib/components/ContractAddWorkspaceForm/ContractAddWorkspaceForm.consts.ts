import { EWorkspaceFields, IWorkspaceDoc } from '@/lib/consts/workspaces';

export const CONTRACT_WORKSPACE_FORM_DEFAULT_VALUES: IWorkspaceDoc = {
  [EWorkspaceFields.Title]: '',
  [EWorkspaceFields.OrderIndex]: -1,
  [EWorkspaceFields.Parent]: '',
  [EWorkspaceFields.ChildrenRefs]: [],
};
