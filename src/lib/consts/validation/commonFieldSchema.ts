import { z } from 'zod';
import { ECommonFields } from '../commonFields';
import {
  OPTIONAL_DATE_SCHEMA,
  OPTIONAL_STRING_SCHEMA,
} from './validationSchema';

export const COMMON_FIELDS_SCHEMA = z.object({
  [ECommonFields.Id]: z.union([z.string().uuid(), z.coerce.number()]),
  [ECommonFields.CreatedAt]: OPTIONAL_DATE_SCHEMA,
  [ECommonFields.CreatedBy]: OPTIONAL_STRING_SCHEMA,
  [ECommonFields.UpdatedAt]: OPTIONAL_DATE_SCHEMA,
  [ECommonFields.UpdatedBy]: OPTIONAL_STRING_SCHEMA,
});
