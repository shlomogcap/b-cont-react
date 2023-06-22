import { z } from 'zod';
import { ICommonFields } from '../commonFields';
import {
  OPTIONAL_DATE_SCHEMA,
  OPTIONAL_STRING_SCHEMA,
} from './validationSchema';

export const COMMON_FIELDS_SCHEMA = z.object({
  [ICommonFields.Id]: z.union([z.string().uuid(), z.coerce.number()]),
  [ICommonFields.CreatedAt]: OPTIONAL_DATE_SCHEMA,
  [ICommonFields.CreatedBy]: OPTIONAL_STRING_SCHEMA,
  [ICommonFields.UpdatedAt]: OPTIONAL_DATE_SCHEMA,
  [ICommonFields.UpdatedBy]: OPTIONAL_STRING_SCHEMA,
});
