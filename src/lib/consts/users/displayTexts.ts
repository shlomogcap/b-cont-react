import { ILang } from '@/lib/consts/displayTexts';
import { EUserFields } from './UserFields';

type IDisplayTextMapping = {
  fields: Record<EUserFields, string>;
};

export const USERS_DISPLAY_TEXTS: Record<ILang, IDisplayTextMapping> = {
  he: {
    fields: {
      [EUserFields.Title]: 'שם',
      [EUserFields.Phone]: 'טלפון',
      [EUserFields.Email]: 'אימייל',
      [EUserFields.Address]: 'כתובת',
      [EUserFields.Description]: 'הערות',
      [EUserFields.Status]: 'סטטוס',
    },
  },
  en: {
    fields: {
      [EUserFields.Title]: 'Name',
      [EUserFields.Phone]: 'Phone',
      [EUserFields.Email]: 'Email',
      [EUserFields.Address]: 'Address',
      [EUserFields.Description]: 'Description',
      [EUserFields.Status]: 'Status',
    },
  },
};
