import { z } from 'zod';
import {
  OPTIONAL_STRING_SCHEMA,
  TITLE_FIELD_SCHEMA,
} from '../validation/validationSchema';
import { EAccountFields } from './AccountFields';
import { COMMON_FIELDS_SCHEMA } from '../validation/commonFieldSchema';

export const AccountDoc = z
  .object({
    [EAccountFields.Title]: TITLE_FIELD_SCHEMA,
    [EAccountFields.Description]: OPTIONAL_STRING_SCHEMA,
    [EAccountFields.PeriodUnit]: OPTIONAL_STRING_SCHEMA,
    [EAccountFields.PeriodFrequancey]: OPTIONAL_STRING_SCHEMA,
    [EAccountFields.Period]: OPTIONAL_STRING_SCHEMA,

    [EAccountFields.PeriodNumber]: OPTIONAL_STRING_SCHEMA,
    [EAccountFields.ConfirmFlow]: OPTIONAL_STRING_SCHEMA,
    [EAccountFields.AccountStage]: OPTIONAL_STRING_SCHEMA,
    [EAccountFields.BillingDate]: OPTIONAL_STRING_SCHEMA,

    [EAccountFields.TotalSections]: OPTIONAL_STRING_SCHEMA,
    [EAccountFields.TotalAdditions]: OPTIONAL_STRING_SCHEMA,
    [EAccountFields.TotalSubtractions]: OPTIONAL_STRING_SCHEMA,
    [EAccountFields.AccumulatedTotal]: OPTIONAL_STRING_SCHEMA,

    [EAccountFields.DelayPercentage]: OPTIONAL_STRING_SCHEMA,
    [EAccountFields.TotalDelay]: OPTIONAL_STRING_SCHEMA,

    [EAccountFields.DelayRelease]: OPTIONAL_STRING_SCHEMA,
    [EAccountFields.TotalAccountToPay]: OPTIONAL_STRING_SCHEMA,

    [EAccountFields.IndexedPercent]: OPTIONAL_STRING_SCHEMA,
    [EAccountFields.TotalIndexed]: OPTIONAL_STRING_SCHEMA,
    [EAccountFields.TotalAfterIndexed]: OPTIONAL_STRING_SCHEMA,

    [EAccountFields.VatPercent]: OPTIONAL_STRING_SCHEMA,
    [EAccountFields.TotalVAT]: OPTIONAL_STRING_SCHEMA,

    [EAccountFields.TaxPercent]: OPTIONAL_STRING_SCHEMA,
    [EAccountFields.TotalTax]: OPTIONAL_STRING_SCHEMA,

    [EAccountFields.TotalToPay]: OPTIONAL_STRING_SCHEMA,
  })
  .merge(COMMON_FIELDS_SCHEMA);

export type IAccountDoc = z.infer<typeof AccountDoc>;
