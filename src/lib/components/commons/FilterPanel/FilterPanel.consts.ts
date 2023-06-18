import { OPTIONAL_DATE_SCHEMA } from '@/lib/consts/validation/validationSchema';
import Z from 'zod';

export const dateFilterSchema = Z.object({
  from: OPTIONAL_DATE_SCHEMA,
  to: OPTIONAL_DATE_SCHEMA,
});
