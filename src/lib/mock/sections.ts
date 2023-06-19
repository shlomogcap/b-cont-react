import { ITableRow } from '../components/commons/Table';
import { ICommonFields } from '../consts/commonFields';
import {
  ESectionCalculationMethod,
  ESectionCalculationType,
  ESectionFields,
} from '../consts/sections';
import { PATH_FIELD, WithPathField } from './utils';

export const MOCK_SECTIONS_DATA: WithPathField<ITableRow<ESectionFields>>[] = [
  {
    [ICommonFields.Id]: '1',
    [PATH_FIELD]: 'projects/1/contracts/1',
    [ESectionFields.Title]: 'חציבת קירות',
    [ESectionFields.Description]: '',
    [ESectionFields.CalculationMethod]: ESectionCalculationMethod.Amount,
    [ESectionFields.CalculationType]: ESectionCalculationType.Percentage,
    [ESectionFields.ItemPrice]: 10_000,
    [ESectionFields.ItemsCount]: 8,
    [ESectionFields.TotalSum]: 8 * 10_000,
    [ESectionFields.DonePercentage]: 0,
    [ESectionFields.TotalActualsSum]: 0,
    [ESectionFields.WorkspaceAreaRef]: 'projects/1/contracts/1/workspaces/1',
    [ESectionFields.WorkspaceGroupRef]: '',
  },
  {
    [ICommonFields.Id]: '2',
    [PATH_FIELD]: 'projects/1/contracts/1',
    [ESectionFields.Title]: 'התקנת מחיצות',
    [ESectionFields.Description]: '',
    [ESectionFields.CalculationMethod]: ESectionCalculationMethod.Pauschal,
    [ESectionFields.CalculationType]: ESectionCalculationType.Numeric,
    [ESectionFields.ItemPrice]: 5_000,
    [ESectionFields.ItemsCount]: 12,
    [ESectionFields.TotalSum]: 12 * 5_000,
    [ESectionFields.DonePercentage]: 0,
    [ESectionFields.TotalActualsSum]: 0,
    [ESectionFields.WorkspaceAreaRef]: 'projects/1/contracts/1/workspaces/2',
    [ESectionFields.WorkspaceGroupRef]: '',
  },
];
