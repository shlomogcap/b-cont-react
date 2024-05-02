import { z } from 'zod';
import {
  NUMBER_SCHEMA,
  OPTIONAL_STRING_SCHEMA,
  STRING_SCHEMA,
} from '../validation/validationSchema';
import { EPaymentFields } from './PaymentFields';
import { COMMON_FIELDS_SCHEMA } from '../validation/commonFieldSchema';

export const PaymentDoc = z
  .object({
    [EPaymentFields.PaymentDate]: STRING_SCHEMA,
    [EPaymentFields.Description]: OPTIONAL_STRING_SCHEMA,
    [EPaymentFields.PaymentChannel]: STRING_SCHEMA,
    [EPaymentFields.PaymentIdentifier]: STRING_SCHEMA,
    [EPaymentFields.PaymentType]: STRING_SCHEMA,
    [EPaymentFields.Sum]: NUMBER_SCHEMA,
  })
  .merge(COMMON_FIELDS_SCHEMA);

export type IPaymentDoc = z.infer<typeof PaymentDoc>;
