import Z from 'zod';
import { IWithCommonFields } from '@/lib/utils/WithFields';
import { EUserFields } from './UserFields';
import {
  OPTIONAL_STRING_SCHEMA,
  TITLE_FIELD_SCHEMA,
} from '../validation/validationSchema';
import { EUserStatus } from './UserStatus';

export const UserDoc = Z.object({
  [EUserFields.Title]: TITLE_FIELD_SCHEMA,
  [EUserFields.Phone]: OPTIONAL_STRING_SCHEMA,
  [EUserFields.Email]: OPTIONAL_STRING_SCHEMA,
  [EUserFields.Address]: OPTIONAL_STRING_SCHEMA,
  [EUserFields.Description]: OPTIONAL_STRING_SCHEMA,
  [EUserFields.Status]: Z.nativeEnum(EUserStatus).optional(),
});

export type IUserDoc = IWithCommonFields<Z.infer<typeof UserDoc>>;
