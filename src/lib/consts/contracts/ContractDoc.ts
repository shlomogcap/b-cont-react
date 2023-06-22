import { z } from 'zod';
import { WithCommonFields } from '@/lib/utils/WithFields';
import { IContractFields } from './ContractFields';
import {
  OPTIONAL_BOOLEAN_SCHEMA,
  OPTIONAL_DATE_SCHEMA,
  OPTIONAL_NUMBER_SCHEMA,
  OPTIONAL_STRING_SCHEMA,
  TITLE_FIELD_SCHEMA,
} from '../validation/validationSchema';
import { IContractActualStatus } from './ContractActualStatus';
import { IContractType } from './ContractType';
import { IContractStatus } from './ContractStatus';

export const ContractDoc = z.object({
  [IContractFields.Title]: TITLE_FIELD_SCHEMA,
  [IContractFields.VendorRef]: OPTIONAL_STRING_SCHEMA,
  [IContractFields.ActualsStatus]: z
    .nativeEnum(IContractActualStatus)
    .optional(),
  [IContractFields.BudgetbudgetaryItem]: OPTIONAL_STRING_SCHEMA,
  [IContractFields.TotalAgreementSum]: OPTIONAL_NUMBER_SCHEMA,
  [IContractFields.PaymentDelay]: OPTIONAL_NUMBER_SCHEMA,
  [IContractFields.DelayPercentage]: OPTIONAL_NUMBER_SCHEMA,
  [IContractFields.Status]: z.nativeEnum(IContractStatus).optional(),
  [IContractFields.IsIndexed]: OPTIONAL_BOOLEAN_SCHEMA,
  [IContractFields.IndexedFactor]: OPTIONAL_STRING_SCHEMA,
  [IContractFields.CalculationMethod]: OPTIONAL_STRING_SCHEMA,
  [IContractFields.SWorkDate]: OPTIONAL_DATE_SCHEMA,
  [IContractFields.NumberOfPeriods]: OPTIONAL_NUMBER_SCHEMA,
  [IContractFields.EWorkDate]: OPTIONAL_DATE_SCHEMA,
  [IContractFields.ContractType]: z.nativeEnum(IContractType).optional(),
  [IContractFields.DonePercentage]: OPTIONAL_NUMBER_SCHEMA,
  [IContractFields.TotalActualsSum]: OPTIONAL_NUMBER_SCHEMA,
  [IContractFields.Description]: OPTIONAL_STRING_SCHEMA,
  [IContractFields.CurrentAccountPeriod]: OPTIONAL_STRING_SCHEMA,
});

export type IContractDoc = WithCommonFields<z.infer<typeof ContractDoc>>;
