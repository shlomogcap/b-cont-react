import { OPTIONAL_DATE_SCHEMA } from '@/lib/consts/validation/validationSchema';
import { z } from 'zod';

export const dateFilterSchema = z.object({
  from: OPTIONAL_DATE_SCHEMA,
  to: OPTIONAL_DATE_SCHEMA,
});
