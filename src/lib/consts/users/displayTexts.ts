import { Lang } from '@/lib/consts/displayTexts';
import { IUserFields } from './UserFields';

type IDisplayTextMapping = {
  fields: Record<IUserFields, string>;
};

export const USERS_DISPLAY_TEXTS: Record<Lang, DisplayTextMapping> = {
  he: {
    fields: {
      [IUserFields.Title]: 'שם',
      [IUserFields.Phone]: 'טלפון',
      [IUserFields.Email]: 'אימייל',
      [IUserFields.Address]: 'כתובת',
      [IUserFields.Description]: 'הערות',
      [IUserFields.Status]: 'סטטוס',
    },
  },
  en: {
    fields: {
      [IUserFields.Title]: 'Name',
      [IUserFields.Phone]: 'Phone',
      [IUserFields.Email]: 'Email',
      [IUserFields.Address]: 'Address',
      [IUserFields.Description]: 'Description',
      [IUserFields.Status]: 'Status',
    },
  },
};
