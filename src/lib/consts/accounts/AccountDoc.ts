import { z } from 'zod';
import {
  INTEGER_SCHEMA,
  NUMBER_SCHEMA,
  OPTIONAL_DATE_SCHEMA,
  OPTIONAL_STRING_SCHEMA,
  STRING_SCHEMA,
  TITLE_FIELD_SCHEMA,
} from '../validation/validationSchema';
import { EAccountFields } from './AccountFields';
import { COMMON_FIELDS_SCHEMA } from '../validation/commonFieldSchema';
import { EPeriodUnit } from './PeriodUnit';
import { ConfirmDoc } from '../confirms/ConfirmDoc';

export const AccountDoc = z
  .object({
    [EAccountFields.Title]: TITLE_FIELD_SCHEMA,
    [EAccountFields.Description]: OPTIONAL_STRING_SCHEMA,
    [EAccountFields.PeriodUnit]: z.nativeEnum(EPeriodUnit),
    [EAccountFields.PeriodFrequancey]: INTEGER_SCHEMA,
    [EAccountFields.Period]: STRING_SCHEMA,

    [EAccountFields.PeriodNumber]: INTEGER_SCHEMA,
    [EAccountFields.ConfirmFlow]: z.array(ConfirmDoc).optional(),
    [EAccountFields.AccountStage]: OPTIONAL_STRING_SCHEMA,
    [EAccountFields.BillingDate]: OPTIONAL_DATE_SCHEMA,

    [EAccountFields.TotalSections]: NUMBER_SCHEMA,
    [EAccountFields.TotalAdditions]: NUMBER_SCHEMA,
    [EAccountFields.TotalSubtractions]: NUMBER_SCHEMA,
    [EAccountFields.AccumulatedTotal]: NUMBER_SCHEMA,

    [EAccountFields.DelayPercentage]: NUMBER_SCHEMA,
    [EAccountFields.TotalDelay]: NUMBER_SCHEMA,

    [EAccountFields.DelayRelease]: NUMBER_SCHEMA,
    [EAccountFields.TotalAccountToPay]: NUMBER_SCHEMA,

    [EAccountFields.IndexedPercent]: NUMBER_SCHEMA,
    [EAccountFields.TotalIndexed]: NUMBER_SCHEMA,
    [EAccountFields.TotalAfterIndexed]: NUMBER_SCHEMA,

    [EAccountFields.VatPercent]: NUMBER_SCHEMA,
    [EAccountFields.TotalVAT]: NUMBER_SCHEMA,

    [EAccountFields.TaxPercent]: NUMBER_SCHEMA,
    [EAccountFields.TotalTax]: NUMBER_SCHEMA,

    [EAccountFields.TotalToPay]: NUMBER_SCHEMA,
  })
  .merge(COMMON_FIELDS_SCHEMA);

export type IAccountDoc = z.infer<typeof AccountDoc>;
