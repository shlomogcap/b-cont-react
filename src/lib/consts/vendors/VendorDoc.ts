import Z from 'zod';
import { WithIdField } from '@/lib/utils/WithIdField';
import { validationTexts } from '../validationTexts';
import { VendorFields } from './VendorFields';

export const VendorDoc = Z.object({
  [VendorFields.Title]: Z.string({
    required_error: validationTexts.REQUIRED,
  })
    .nonempty(validationTexts.REQUIRED)
    .min(4, validationTexts.TOO_SHORT),
});

export type IVendorDoc = WithIdField<Z.infer<typeof VendorDoc>>;
