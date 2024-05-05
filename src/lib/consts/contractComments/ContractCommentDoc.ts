import { z } from 'zod';
import {
  OPTIONAL_STRING_SCHEMA,
  STRING_SCHEMA,
} from '../validation/validationSchema';
import { COMMON_FIELDS_SCHEMA } from '../validation/commonFieldSchema';
import { EContractCommentFields } from './ContractCommentFields';

export const ContractCommentDoc = z
  .object({
    [EContractCommentFields.Title]: STRING_SCHEMA,
    [EContractCommentFields.Description]: OPTIONAL_STRING_SCHEMA,
    [EContractCommentFields.Pinned]: z.boolean(),
    [EContractCommentFields.AccountRef]: OPTIONAL_STRING_SCHEMA,
  })
  .merge(COMMON_FIELDS_SCHEMA);

export type IContractCommentDoc = z.infer<typeof ContractCommentDoc>;
