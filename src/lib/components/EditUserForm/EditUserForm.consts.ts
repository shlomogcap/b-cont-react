import { ILang } from '@/lib/consts/displayTexts';
import { PASSWORD_SCHEMA } from '@/lib/consts/validation/validationSchema';
import { z } from 'zod';

export enum EEditUserFields {
  Email = 'email',
  DisplayName = 'displayName',
  Password = 'passowrd',
  RepeatPassword = 'repeatPassowrd',
}
export enum EEditUserActions {
  Update = 'update',
  Reset = 'reset',
}
export enum EEditUserTabs {
  Info = 'info',
  Password = 'password',
}

type IDisplayTextMapping = {
  title: string;
  fields: Record<EEditUserFields, string>;
  actions: Record<EEditUserActions, string>;
  tabNames: Record<EEditUserTabs, string>;
};

export const EDIT_USER_DISPLAY_TEXTS: Record<ILang, IDisplayTextMapping> = {
  he: {
    title: 'פרטי משתמש',
    fields: {
      [EEditUserFields.Email]: 'אימייל',
      [EEditUserFields.DisplayName]: 'שם',
      [EEditUserFields.Password]: 'סיסמא חדשה',
      [EEditUserFields.RepeatPassword]: 'וודא סיסמא',
    },
    actions: {
      [EEditUserActions.Update]: 'שמור',
      [EEditUserActions.Reset]: 'עדכן',
    },
    tabNames: {
      [EEditUserTabs.Info]: 'עדכון פרטי משתמש',
      [EEditUserTabs.Password]: 'עדכון סיסמא',
    },
  },
  en: {
    title: 'User Data',
    fields: {
      [EEditUserFields.Email]: 'Email',
      [EEditUserFields.DisplayName]: 'Display Name',
      [EEditUserFields.Password]: 'New Password',
      [EEditUserFields.RepeatPassword]: 'Verify Password',
    },
    actions: {
      [EEditUserActions.Update]: 'Save',
      [EEditUserActions.Reset]: 'Reset',
    },
    tabNames: {
      [EEditUserTabs.Info]: 'Update user info',
      [EEditUserTabs.Password]: 'Edit passowrd',
    },
  },
};

export const EDIT_USER_TABS = [
  {
    id: EEditUserTabs.Info,
    text: EDIT_USER_DISPLAY_TEXTS.he.tabNames[EEditUserTabs.Info],
  },
  {
    id: EEditUserTabs.Password,
    text: EDIT_USER_DISPLAY_TEXTS.he.tabNames[EEditUserTabs.Password],
  },
];

export const PASSWORD_RESOLVER_SCHEMA = z
  .object({
    [EEditUserFields.Password]: PASSWORD_SCHEMA,
    [EEditUserFields.RepeatPassword]: PASSWORD_SCHEMA,
  })
  .refine(
    (values) => {
      return (
        values[EEditUserFields.Password] ===
        values[EEditUserFields.RepeatPassword]
      );
    },
    {
      message: 'Passwords do not match',
      path: [EEditUserFields.RepeatPassword],
    },
  );
