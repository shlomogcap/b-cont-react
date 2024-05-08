import { FALLBACK_BROKEN_REF_TEXT } from '@/lib/consts/fallbackText';
import { EUserFields, IUserDoc } from '@/lib/consts/users';

export const getDisplaydUser = (users: IUserDoc[], uid?: string) => {
  const findUser = users.find(({ id }) => id === uid);
  if (findUser) {
    return findUser[EUserFields.Title] ?? findUser[EUserFields.Email];
  }
  return FALLBACK_BROKEN_REF_TEXT;
};
