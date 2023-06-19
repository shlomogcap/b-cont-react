import { ITableRow } from '../components/commons/Table';
import { ECommonFields } from '../consts/commonFields';
import {
  ESectionCalculationMethod,
  ESectionCalculationType,
  ESectionFields,
} from '../consts/sections';
import { PATH_FIELD, IWithPathField } from './utils';

export const MOCK_SECTIONS_DATA: IWithPathField<ITableRow<ESectionFields>>[] = [
  {
    [ECommonFields.Id]: '1',
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
  },
  {
    [ECommonFields.Id]: '2',
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
  },
];
