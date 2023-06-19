import Z from 'zod';
import { IWithCommonFields } from '@/lib/utils/WithFields';
import { EContractFields } from './ContractFields';
import {
  OPTIONAL_BOOLEAN_SCHEMA,
  OPTIONAL_DATE_SCHEMA,
  OPTIONAL_NUMBER_SCHEMA,
  OPTIONAL_STRING_SCHEMA,
  TITLE_FIELD_SCHEMA,
} from '../validation/validationSchema';
import { EContractActualStatus } from './ContractActualStatus';
import { EContractType } from './ContractType';
import { EContractStatus } from './ContractStatus';

export const ContractDoc = Z.object({
  [EContractFields.Title]: TITLE_FIELD_SCHEMA,
  [EContractFields.VendorRef]: OPTIONAL_STRING_SCHEMA,
  [EContractFields.ActualsStatus]: Z.nativeEnum(
    EContractActualStatus,
  ).optional(),
  [EContractFields.BudgetbudgetaryItem]: OPTIONAL_STRING_SCHEMA,
  [EContractFields.TotalAgreementSum]: OPTIONAL_NUMBER_SCHEMA,
  [EContractFields.PaymentDelay]: OPTIONAL_NUMBER_SCHEMA,
  [EContractFields.DelayPercentage]: OPTIONAL_NUMBER_SCHEMA,
  [EContractFields.Status]: Z.nativeEnum(EContractStatus).optional(),
  [EContractFields.IsIndexed]: OPTIONAL_BOOLEAN_SCHEMA,
  [EContractFields.IndexedFactor]: OPTIONAL_STRING_SCHEMA,
  [EContractFields.CalculationMethod]: OPTIONAL_STRING_SCHEMA,
  [EContractFields.SWorkDate]: OPTIONAL_DATE_SCHEMA,
  [EContractFields.NumberOfPeriods]: OPTIONAL_NUMBER_SCHEMA,
  [EContractFields.EWorkDate]: OPTIONAL_DATE_SCHEMA,
  [EContractFields.ContractType]: Z.nativeEnum(EContractType).optional(),
  [EContractFields.DonePercentage]: OPTIONAL_NUMBER_SCHEMA,
  [EContractFields.TotalActualsSum]: OPTIONAL_NUMBER_SCHEMA,
  [EContractFields.Description]: OPTIONAL_STRING_SCHEMA,
  [EContractFields.CurrentAccountPeriod]: OPTIONAL_STRING_SCHEMA,
});

export type IContractDoc = IWithCommonFields<Z.infer<typeof ContractDoc>>;
