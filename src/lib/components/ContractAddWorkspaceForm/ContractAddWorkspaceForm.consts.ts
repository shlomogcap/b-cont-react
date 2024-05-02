import { EWorkspaceFields, IWorkspaceDoc } from '@/lib/consts/workspaces';
import { DefaultValues } from 'react-hook-form';

export const CONTRACT_WORKSPACE_FORM_DEFAULT_VALUES: DefaultValues<IWorkspaceDoc> =
  {
    [EWorkspaceFields.Title]: '',
    [EWorkspaceFields.OrderIndex]: -1,
    [EWorkspaceFields.Parent]: '',
    [EWorkspaceFields.ChildrenRefs]: [],
  };
