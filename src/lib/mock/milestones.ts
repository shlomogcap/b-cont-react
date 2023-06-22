import { ITableRow } from '../components/commons/Table';
import { ICommonFields } from '../consts/commonFields';
import { EMilestoneFields } from '../consts/milestones';
import { PATH_FIELD, WithPathField } from './utils';

export const MOCK_MILESTONES_DATA: WithPathField<
  ITableRow<EMilestoneFields>
>[] = [
  {
    [ICommonFields.Id]: '1',
    [PATH_FIELD]: 'projects/1/contracts/1/sections/1',
    [EMilestoneFields.Title]: 'תחילת חציבה',
    [EMilestoneFields.OrderIndex]: 1,
    [EMilestoneFields.Price]: 3_000,
    [EMilestoneFields.Weight]: 100,
    [EMilestoneFields.TotalDone]: 0,
  },
  {
    [ICommonFields.Id]: '2',
    [PATH_FIELD]: 'projects/1/contracts/1/sections/1',
    [EMilestoneFields.Title]: 'השלמת חורים',
    [EMilestoneFields.OrderIndex]: 2,
    [EMilestoneFields.Price]: 2_000,
    [EMilestoneFields.Weight]: 100,
    [EMilestoneFields.TotalDone]: 0,
  },
  {
    [ICommonFields.Id]: '3',
    [PATH_FIELD]: 'projects/1/contracts/1/sections/1',
    [EMilestoneFields.Title]: 'השחלת שומרי מקום',
    [EMilestoneFields.OrderIndex]: 3,
    [EMilestoneFields.Price]: 1_000,
    [EMilestoneFields.Weight]: 100,
    [EMilestoneFields.TotalDone]: 0,
  },
  {
    [ICommonFields.Id]: '4',
    [PATH_FIELD]: 'projects/1/contracts/1/sections/1',
    [EMilestoneFields.Title]: 'סגירת פתחים',
    [EMilestoneFields.OrderIndex]: 4,
    [EMilestoneFields.Price]: 4_000,
    [EMilestoneFields.Weight]: 100,
    [EMilestoneFields.TotalDone]: 0,
  },
];
