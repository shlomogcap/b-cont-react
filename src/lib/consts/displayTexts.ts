import { IRoutesNames } from './routes';

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
  routeNames: Record<IRoutesNames, string>;
  buttons: Record<IButtonTexts, string>;
  tableStates: Record<ITableStates, string>;
};

export const DISPLAY_TEXTS: Record<Lang, DisplayTextMapping> = {
  he: {
    toasts: {
      [IToastType.AddingNewDoc]: 'הנתונים נשמרו בהצלחה',
      [IToastType.SavingDocData]: 'הנתונים נשמרו בהצלחה',
    },
    tableStates: {
      [ITableStates.NoRows]: 'לא נמצאו נתונים',
      [ITableStates.Loading]: 'טוען...',
      [ITableStates.Error]: 'אירעה שגיאה',
    },
    buttons: {
      [IButtonTexts.Save]: 'שמור',
      [IButtonTexts.Cancel]: 'בטל שינויים',
    },
    routeNames: {
      [IRoutesNames.App]: 'פרוייקטים',
      [IRoutesNames.ProjectsWithType]: 'פרוייקטים',
      [IRoutesNames.Projects]: 'פרוייקטים',
      [IRoutesNames.Vendors]: 'קבלנים',
      [IRoutesNames.Settings]: 'הגדרות',
      [IRoutesNames.Project]: 'פרוייקט',
      [IRoutesNames.Contract]: 'חוזה',
      [IRoutesNames.Vendor]: 'קבלן',
      [IRoutesNames.Me]: 'המשתמש שלי',
      [IRoutesNames.Company]: 'פרטי חברה/חברות',
      [IRoutesNames.Budget]: 'פרקים תקציב',
    },
  },
  en: {
    toasts: {
      [IToastType.AddingNewDoc]: 'Data Added Succefully',
      [IToastType.SavingDocData]: 'Data Saved Succefully',
    },
    tableStates: {
      [ITableStates.NoRows]: 'No Rows',
      [ITableStates.Loading]: 'Loading...',
      [ITableStates.Error]: 'An Error Has Occured',
    },
    routeNames: {
      [IRoutesNames.App]: 'Projects',
      [IRoutesNames.Projects]: 'Projects',
      [IRoutesNames.ProjectsWithType]: 'Projects',
      [IRoutesNames.Vendors]: 'Vendors',
      [IRoutesNames.Settings]: 'Settings',
      [IRoutesNames.Project]: 'Project',
      [IRoutesNames.Contract]: 'Contract',
      [IRoutesNames.Vendor]: 'Vendor',
      [IRoutesNames.Me]: 'Me',
      [IRoutesNames.Company]: 'Company',
      [IRoutesNames.Budget]: 'Budget',
    },
    buttons: {
      [IButtonTexts.Save]: 'Save',
      [IButtonTexts.Cancel]: 'Cancel',
    },
  },
};
