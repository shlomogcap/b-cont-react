import { z } from 'zod';
import { WithCommonFields } from '@/lib/utils/WithFields';
import { IUserFields } from './UserFields';
import {
  OPTIONAL_STRING_SCHEMA,
  TITLE_FIELD_SCHEMA,
} from '../validation/validationSchema';
import { IUserStatus } from './UserStatus';

export const UserDoc = z.object({
  [IUserFields.Title]: TITLE_FIELD_SCHEMA,
  [IUserFields.Phone]: OPTIONAL_STRING_SCHEMA,
  [IUserFields.Email]: OPTIONAL_STRING_SCHEMA,
  [IUserFields.Address]: OPTIONAL_STRING_SCHEMA,
  [IUserFields.Description]: OPTIONAL_STRING_SCHEMA,
  [IUserFields.Status]: z.nativeEnum(IUserStatus).optional(),
});

export type IUserDoc = WithCommonFields<z.infer<typeof UserDoc>>;
