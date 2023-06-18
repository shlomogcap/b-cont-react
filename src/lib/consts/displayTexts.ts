import { IRoutesNames } from './routes';

export type Lang = 'he' | 'en';

export enum EButtonTexts {
  Save,
  Cancel,
}
export enum ETableStates {
  NoRows,
  Loading,
  Error,
}
export enum EToastType {
  AddingNewDoc,
  SavingDocData,
}
export enum EBoolean {
  False,
  True,
}

export enum EFilterPanelStates {
  Active,
  InActive,
  From,
  To,
  Filter,
  Reset,
  Close,
}

type DisplayTextMapping = {
  toasts: Record<IToastType, string>;
  routeNames: Record<IRoutesNames, string>;
  buttons: Record<IButtonTexts, string>;
  boolean: Record<IBoolean, string>;
  tableStates: Record<ITableStates, string>;
  filterPanel: Record<IFilterPanelStates, string>;
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
    filterPanel: {
      [IFilterPanelStates.Active]: 'פעיל',
      [IFilterPanelStates.InActive]: 'לא פעיל',
      [IFilterPanelStates.From]: 'מ',
      [IFilterPanelStates.To]: 'עד',
      [IFilterPanelStates.Filter]: 'סנן',
      [IFilterPanelStates.Reset]: 'אפס',
      [IFilterPanelStates.Close]: 'סגור',
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
    },
    filterPanel: {
      [IFilterPanelStates.Active]: 'Active',
      [IFilterPanelStates.InActive]: 'Not Active',
      [IFilterPanelStates.From]: 'From',
      [IFilterPanelStates.To]: 'To',
      [IFilterPanelStates.Filter]: 'Filter',
      [IFilterPanelStates.Reset]: 'Reset',
      [IFilterPanelStates.Close]: 'Close',
    },
  },
};
