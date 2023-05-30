import Z from 'zod';
import { WithIdField } from '@/lib/utils/WithIdField';
import { VendorFields } from './VendorFields';
import { TITLE_FIELD_SCHEMA } from '../validation/validationSchema';

export const VendorDoc = Z.object({
  [VendorFields.Title]: TITLE_FIELD_SCHEMA,
});

export type IVendorDoc = WithIdField<Z.infer<typeof VendorDoc>>;
