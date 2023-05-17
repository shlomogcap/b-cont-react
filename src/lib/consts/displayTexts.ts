import { ProjectType } from './projectTypes';
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

type DisplayTextMapping = {
  projectType: Record<ProjectType, string>;
  routeNames: Record<Routes, string>;
  buttons: Record<IButtonTexts, string>;
  table: Record<ITableStates, string>;
};

export const DISPLAY_TEXTS: Record<Lang, DisplayTextMapping> = {
  he: {
    table: {
      [ITableStates.NoRows]: 'לא נמצאו נתונים',
      [ITableStates.Loading]: 'טוען...',
      [ITableStates.Error]: 'אירעה שגיאה',
    },
    buttons: {
      [IButtonTexts.Save]: 'שמור',
      [IButtonTexts.Cancel]: 'בטל שינויים',
    },
    projectType: {
      [ProjectType.Residential]: 'מגורים',
      [ProjectType.PublicSpace]: 'ציבורי',
      [ProjectType.Entrepreneurship]: 'יזמות',
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
    table: {
      [ITableStates.NoRows]: 'No Rows',
      [ITableStates.Loading]: 'Loading...',
      [ITableStates.Error]: 'An Error Has Occured',
    },
    projectType: {
      [ProjectType.Residential]: 'Residential',
      [ProjectType.PublicSpace]: 'Public Space',
      [ProjectType.Entrepreneurship]: 'Entrepreneurship',
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
