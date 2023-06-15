import { ITableRow } from '../components/commons/Table';
import { ICommonFields } from '../consts/commonFields';
import { EWorkspaceEntityType, EWorkspaceFields } from '../consts/workspaces';
import { PATH_FIELD, WithPathField } from './utils';

export const MOCK_WORKSPACES_DATA: WithPathField<
  ITableRow<EWorkspaceFields>
>[] = [
  {
    [ICommonFields.Id]: '1',
    [PATH_FIELD]: 'projects/1/contracts/1',
    [EWorkspaceFields.Title]: 'בניין 1',
    [EWorkspaceFields.Description]: '',
    [EWorkspaceFields.OrderIndex]: 1,
    [EWorkspaceFields.EntityType]: EWorkspaceEntityType.Workspace,
    [EWorkspaceFields.Description]: '',
    [EWorkspaceFields.Parent]: '',
    [EWorkspaceFields.InstrumentRef]: '',
  },
  {
    [ICommonFields.Id]: '2',
    [PATH_FIELD]: 'projects/1/contracts/1',
    [EWorkspaceFields.Title]: 'בניין 2',
    [EWorkspaceFields.OrderIndex]: 2,
    [EWorkspaceFields.EntityType]: EWorkspaceEntityType.Workspace,
    [EWorkspaceFields.Description]: '',
    [EWorkspaceFields.Parent]: '',
    [EWorkspaceFields.InstrumentRef]: '',
  },
  {
    [ICommonFields.Id]: '3',
    [PATH_FIELD]: 'projects/1/contracts/1',
    [EWorkspaceFields.Title]: 'סעיפים',
    [EWorkspaceFields.OrderIndex]: 1,
    [EWorkspaceFields.EntityType]: EWorkspaceEntityType.Group,
    [EWorkspaceFields.Description]: '',
    [EWorkspaceFields.Parent]: 'projects/1/contracts/1/workspaces/1',
    [EWorkspaceFields.InstrumentRef]: '',
  },
  {
    [ICommonFields.Id]: '4',
    [PATH_FIELD]: 'projects/1/contracts/1',
    [EWorkspaceFields.Title]: 'סעיפים',
    [EWorkspaceFields.OrderIndex]: 1,
    [EWorkspaceFields.EntityType]: EWorkspaceEntityType.Group,
    [EWorkspaceFields.Description]: '',
    [EWorkspaceFields.Parent]: 'projects/1/contracts/1/workspaces/2',
    [EWorkspaceFields.InstrumentRef]: '',
  },
  {
    [ICommonFields.Id]: '5',
    [PATH_FIELD]: 'projects/1/contracts/2',
    [EWorkspaceFields.Title]: 'איזור עבודה',
    [EWorkspaceFields.OrderIndex]: 1,
    [EWorkspaceFields.EntityType]: EWorkspaceEntityType.Workspace,
    [EWorkspaceFields.Description]: '',
    [EWorkspaceFields.Parent]: '',
    [EWorkspaceFields.InstrumentRef]: '',
  },
  {
    [ICommonFields.Id]: '6',
    [PATH_FIELD]: 'projects/1/contracts/2',
    [EWorkspaceFields.Title]: 'סעיפים',
    [EWorkspaceFields.OrderIndex]: 1,
    [EWorkspaceFields.EntityType]: EWorkspaceEntityType.Group,
    [EWorkspaceFields.Parent]: 'projects/1/contracts/2/workspaces/4',
    [EWorkspaceFields.Description]: '',
    [EWorkspaceFields.InstrumentRef]: '',
  },
  {
    [ICommonFields.Id]: '7',
    [PATH_FIELD]: 'projects/1/contracts/2',
    [EWorkspaceFields.Title]: 'עוד סעיפים',
    [EWorkspaceFields.OrderIndex]: 2,
    [EWorkspaceFields.EntityType]: EWorkspaceEntityType.Group,
    [EWorkspaceFields.Parent]: 'projects/1/contracts/2/workspaces/4',
    [EWorkspaceFields.Description]: '',
    [EWorkspaceFields.InstrumentRef]: '',
  },
];
