import Z from 'zod';
import { WithIdField } from '@/lib/utils/WithIdField';
import { IContractFields } from './ContractFields';
import {
  OPTIONAL_DATE_SCHEMA,
  OPTIONAL_NUMBER_SCHEMA,
  OPTIONAL_STRING_SCHEMA,
  TITLE_FIELD_SCHEMA,
} from '../validation/validationSchema';
import { IContractActualStatus } from './ContractActualStatus';
import { IContractType } from './ContractType';

export const ContractDoc = Z.object({
  [IContractFields.Title]: TITLE_FIELD_SCHEMA,
  [IContractFields.VendorRef]: OPTIONAL_STRING_SCHEMA,
  [IContractFields.ActualsStatus]: Z.nativeEnum(
    IContractActualStatus,
  ).optional(),
  [IContractFields.BudgetbudgetaryItem]: OPTIONAL_STRING_SCHEMA,
  [IContractFields.TotalAgreementSum]: OPTIONAL_NUMBER_SCHEMA,
  [IContractFields.PaymentDelay]: OPTIONAL_STRING_SCHEMA,
  [IContractFields.DelayPercentage]: OPTIONAL_STRING_SCHEMA,
  [IContractFields.Status]: OPTIONAL_STRING_SCHEMA,
  [IContractFields.IsIndexed]: OPTIONAL_STRING_SCHEMA,
  [IContractFields.IndexedFactor]: OPTIONAL_STRING_SCHEMA,
  [IContractFields.CalculationMethod]: OPTIONAL_STRING_SCHEMA,
  [IContractFields.SWorkDate]: OPTIONAL_DATE_SCHEMA,
  [IContractFields.NumberOfPeriods]: OPTIONAL_NUMBER_SCHEMA,
  [IContractFields.EWorkDate]: OPTIONAL_DATE_SCHEMA,
  [IContractFields.ContractType]: Z.nativeEnum(IContractType).optional(),
  [IContractFields.DonePercentage]: OPTIONAL_NUMBER_SCHEMA,
  [IContractFields.TotalActualsSum]: OPTIONAL_NUMBER_SCHEMA,
  [IContractFields.Description]: OPTIONAL_STRING_SCHEMA,
});

export type IContractDoc = WithIdField<Z.infer<typeof ContractDoc>>;
