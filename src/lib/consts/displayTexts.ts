import { IRoutesNames } from './routes';

export type Lang = 'he' | 'en';

export enum IButtonTexts {
  Save,
  Cancel,
  Add,
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
export enum IBoolean {
  False,
  True,
}

type DisplayTextMapping = {
  toasts: Record<IToastType, string>;
  routeNames: Record<IRoutesNames, string>;
  buttons: Record<IButtonTexts, string>;
  boolean: Record<IBoolean, string>;
  tableStates: Record<ITableStates, string>;
};

export const DISPLAY_TEXTS: Record<Lang, DisplayTextMapping> = {
  he: {
    boolean: {
      [IBoolean.False]: 'לא',
      [IBoolean.True]: 'כן',
    },
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
      [IButtonTexts.Add]: 'הוספה',
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
    boolean: {
      [IBoolean.False]: 'No',
      [IBoolean.True]: 'Yes',
    },
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
      [IButtonTexts.Add]: 'Add',
    },
  },
};
