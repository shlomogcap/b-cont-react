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

export enum IFilterPanelStates {
  Active,
  InActive,
  From,
  To,
  Filter,
  Clear,
}

type DisplayTextMapping = {
  toasts: Record<IToastType, string>;
  routeNames: Record<Exclude<IRoutesNames, IRoutesNames.App>, string>;
  buttons: Record<IButtonTexts, string>;
  table: Record<ITableStates, string>;
  filterPanel: Record<IFilterPanelStates, string>;
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
      [IFilterPanelStates.Clear]: 'נקה',
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
      [IRoutesNames.Projects]: 'Projects',
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
      [IFilterPanelStates.Clear]: 'Clear',
    },
  },
};
