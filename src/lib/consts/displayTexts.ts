import { Routes } from './routes';

export type Lang = 'he' | 'en';

export enum IButtonTexts {
  Save,
  Cancel,
}
export enum ITableStates {
  NoRows,
  Loading,
  Error,
}
export enum IToastType {
  AddingNewDoc,
  SavingDocData,
}

type DisplayTextMapping = {
  toasts: Record<IToastType, string>;
  routeNames: Record<Exclude<Routes, Routes.App>, string>;
  buttons: Record<IButtonTexts, string>;
  table: Record<ITableStates, string>;
};

export const DISPLAY_TEXTS: Record<Lang, DisplayTextMapping> = {
  he: {
    toasts: {
      [IToastType.AddingNewDoc]: 'הנתונים נשמרו בהצלחה',
      [IToastType.SavingDocData]: 'הנתונים נשמרו בהצלחה',
    },
    table: {
      [ITableStates.NoRows]: 'לא נמצאו נתונים',
      [ITableStates.Loading]: 'טוען...',
      [ITableStates.Error]: 'אירעה שגיאה',
    },
    buttons: {
      [IButtonTexts.Save]: 'שמור',
      [IButtonTexts.Cancel]: 'בטל שינויים',
    },
    routeNames: {
      [Routes.Projects]: 'פרוייקטים',
      [Routes.Vendors]: 'קבלנים',
      [Routes.Settings]: 'הגדרות',
      [Routes.Project]: 'פרוייקט',
      [Routes.Contract]: 'חוזה',
      [Routes.Vendor]: 'קבלן',
      [Routes.Me]: 'המשתמש שלי',
      [Routes.Company]: 'פרטי חברה/חברות',
      [Routes.Budget]: 'פרקים תקציב',
    },
  },
  en: {
    toasts: {
      [IToastType.AddingNewDoc]: 'Data Added Succefully',
      [IToastType.SavingDocData]: 'Data Saved Succefully',
    },
    table: {
      [ITableStates.NoRows]: 'No Rows',
      [ITableStates.Loading]: 'Loading...',
      [ITableStates.Error]: 'An Error Has Occured',
    },
    routeNames: {
      [Routes.Projects]: 'Projects',
      [Routes.Vendors]: 'Vendors',
      [Routes.Settings]: 'Settings',
      [Routes.Project]: 'Project',
      [Routes.Contract]: 'Contract',
      [Routes.Vendor]: 'Vendor',
      [Routes.Me]: 'Me',
      [Routes.Company]: 'Company',
      [Routes.Budget]: 'Budget',
    },
    buttons: {
      [IButtonTexts.Save]: 'Save',
      [IButtonTexts.Cancel]: 'Cancel',
    },
  },
};
