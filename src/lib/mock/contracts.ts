import { ITableRow } from '../components/commons/Table';
import { ID_FIELD } from '../consts/commonFields';
import {
  IContractFields,
  IContractActualStatus,
  IContractType,
  IContractStatus,
  IContractCalculationMethod,
} from '../consts/contracts';

const PATH_FIELD = 'path';

type WithPathField<T> = T & { [PATH_FIELD]: string };

export const MOCK_CONTRACTS_DATA: WithPathField<ITableRow<IContractFields>>[] =
  [
    {
      [ID_FIELD]: '1',
      [PATH_FIELD]: 'projects/1',
      [IContractFields.Title]: 'חיפוי וריצוף מדוקק',
      [IContractFields.Description]: '',
      [IContractFields.BudgetbudgetaryItem]: '9.1',
      [IContractFields.ActualsStatus]: IContractActualStatus.InCareOfAccounting,
      [IContractFields.VendorRef]: 'vendors/1',
      [IContractFields.TotalAgreementSum]: 119_000,
      [IContractFields.PaymentDelay]: 18,
      [IContractFields.ContractType]: IContractType.Amount,
      [IContractFields.DelayPercentage]: 0.05,
      [IContractFields.Status]: IContractStatus.Active,
      [IContractFields.IsIndexed]: true,
      [IContractFields.IndexedFactor]: '',
      [IContractFields.CalculationMethod]: IContractCalculationMethod.Amount,
      [IContractFields.SWorkDate]: '2023-05-05',
      [IContractFields.NumberOfPeriods]: 12,
      [IContractFields.EWorkDate]: '2024-05-05',
      [IContractFields.DonePercentage]: 0.53,
      [IContractFields.TotalActualsSum]: 63_000,
    },
    {
      [ID_FIELD]: '2',
      [PATH_FIELD]: 'projects/1',
      [IContractFields.Title]: 'מיזוג אוויר',
      [IContractFields.Description]: '',
      [IContractFields.BudgetbudgetaryItem]: '4',
      [IContractFields.ActualsStatus]: IContractActualStatus.None,
      [IContractFields.VendorRef]: 'vendors/1',
      [IContractFields.TotalAgreementSum]: 859_558,
      [IContractFields.PaymentDelay]: 60,
      [IContractFields.ContractType]: IContractType.Pauschal,
      [IContractFields.DelayPercentage]: 0.05,
      [IContractFields.Status]: IContractStatus.Active,
      [IContractFields.IsIndexed]: false,
      [IContractFields.IndexedFactor]: '',
      [IContractFields.CalculationMethod]: IContractCalculationMethod.Pauschal,
      [IContractFields.SWorkDate]: '2023-05-05',
      [IContractFields.NumberOfPeriods]: 12,
      [IContractFields.EWorkDate]: '2024-05-05',
      [IContractFields.DonePercentage]: 0.53,
      [IContractFields.TotalActualsSum]: 772_767,
    },
  ];
