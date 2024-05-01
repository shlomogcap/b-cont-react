import { ECommonFields } from '../consts/commonFields';
import {
  EWorkspaceFields,
  IWorkspaceDoc,
} from '../consts/workspaces';
import { PATH_FIELD, IWithPathField } from './utils';

export const MOCK_WORKSPACES_DATA: IWithPathField<IWorkspaceDoc>[] = [
  {
    [ECommonFields.Id]: '1',
    [PATH_FIELD]: 'projects/1/contracts/1',
    [EWorkspaceFields.Title]: 'בניין 1',
    [EWorkspaceFields.OrderIndex]: 1,
    [EWorkspaceFields.Description]: '',
    [EWorkspaceFields.Parent]: '',
    [EWorkspaceFields.InstrumentRef]: '',
    [EWorkspaceFields.ChildrenRefs]: ['projects/1/contracts/1/workspaces/3'],
  },
  {
    [ECommonFields.Id]: '2',
    [PATH_FIELD]: 'projects/1/contracts/1',
    [EWorkspaceFields.Title]: 'בניין 2',
    [EWorkspaceFields.OrderIndex]: 2,
    [EWorkspaceFields.Description]: '',
    [EWorkspaceFields.Parent]: '',
    [EWorkspaceFields.InstrumentRef]: '',
    [EWorkspaceFields.ChildrenRefs]: ['projects/1/contracts/1/workspaces/4'],
  },
  {
    [ECommonFields.Id]: '3',
    [PATH_FIELD]: 'projects/1/contracts/1',
    [EWorkspaceFields.Title]: 'סעיפים',
    [EWorkspaceFields.OrderIndex]: 1,
    [EWorkspaceFields.Description]: '',
    [EWorkspaceFields.Parent]: 'projects/1/contracts/1/workspaces/1',
    [EWorkspaceFields.InstrumentRef]: '',
    [EWorkspaceFields.ChildrenRefs]: [],
  },
  {
    [ECommonFields.Id]: '4',
    [PATH_FIELD]: 'projects/1/contracts/1',
    [EWorkspaceFields.Title]: 'סעיפים',
    [EWorkspaceFields.OrderIndex]: 1,
    [EWorkspaceFields.Description]: '',
    [EWorkspaceFields.Parent]: 'projects/1/contracts/1/workspaces/2',
    [EWorkspaceFields.InstrumentRef]: '',
    [EWorkspaceFields.ChildrenRefs]: [],
  },
  {
    [ECommonFields.Id]: '5',
    [PATH_FIELD]: 'projects/1/contracts/2',
    [EWorkspaceFields.Title]: 'איזור עבודה',
    [EWorkspaceFields.OrderIndex]: 1,
    [EWorkspaceFields.Description]: '',
    [EWorkspaceFields.Parent]: '',
    [EWorkspaceFields.InstrumentRef]: '',
    [EWorkspaceFields.ChildrenRefs]: [],
  },
  {
    [ECommonFields.Id]: '6',
    [PATH_FIELD]: 'projects/1/contracts/2',
    [EWorkspaceFields.Title]: 'סעיפים',
    [EWorkspaceFields.OrderIndex]: 1,
    [EWorkspaceFields.Parent]: 'projects/1/contracts/2/workspaces/4',
    [EWorkspaceFields.Description]: '',
    [EWorkspaceFields.InstrumentRef]: '',
    [EWorkspaceFields.ChildrenRefs]: [],
  },
  {
    [ECommonFields.Id]: '7',
    [PATH_FIELD]: 'projects/1/contracts/2',
    [EWorkspaceFields.Title]: 'עוד סעיפים',
    [EWorkspaceFields.OrderIndex]: 2,
    [EWorkspaceFields.Parent]: 'projects/1/contracts/2/workspaces/4',
    [EWorkspaceFields.Description]: '',
    [EWorkspaceFields.InstrumentRef]: '',
    [EWorkspaceFields.ChildrenRefs]: [],
  },
];
