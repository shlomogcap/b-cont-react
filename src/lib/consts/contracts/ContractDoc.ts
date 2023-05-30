import Z from 'zod';
import { WithIdField } from '@/lib/utils/WithIdField';
import { validationTexts } from '../validationTexts';
import { IContractFields } from './ContractFields';

export const ContractDoc = Z.object({
  [IContractFields.Title]: Z.string({
    required_error: validationTexts.REQUIRED,
  })
    .nonempty(validationTexts.REQUIRED)
    .min(4, validationTexts.TOO_SHORT),
});

export type IContractDoc = WithIdField<Z.infer<typeof ContractDoc>>;
