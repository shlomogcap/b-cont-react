import { z } from 'zod';
import {
  NUMBER_SCHEMA,
  OPTIONAL_STRING_SCHEMA,
  STRING_SCHEMA,
  TITLE_FIELD_SCHEMA,
} from '../validation/validationSchema';
import { EActualCalcFields, EActualFields } from './ActualFields';
import { COMMON_FIELDS_SCHEMA } from '../validation/commonFieldSchema';

export const ActualDoc = z
  .object({
    [EActualFields.Title]: TITLE_FIELD_SCHEMA,
    [EActualFields.Description]: OPTIONAL_STRING_SCHEMA,
    [EActualFields.Calc]: z.object({
      [EActualCalcFields._ModelId]: STRING_SCHEMA,
      [EActualCalcFields._ActualsValue]: NUMBER_SCHEMA,
      [EActualCalcFields._ItemPrice]: NUMBER_SCHEMA,
      [EActualCalcFields._Weight]: NUMBER_SCHEMA,
      [EActualCalcFields._Price]: NUMBER_SCHEMA,
    }),
    [EActualFields.CurrentTotal]: NUMBER_SCHEMA,
    [EActualFields.SectionRef]: STRING_SCHEMA,
    [EActualFields.Unit]: NUMBER_SCHEMA,
    [EActualFields.Value]: NUMBER_SCHEMA,
  })
  .merge(COMMON_FIELDS_SCHEMA);

export type IActualDoc = z.infer<typeof ActualDoc>;
