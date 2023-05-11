import { ProjectType } from './projectTypes';
import { Routes } from './routes';

export type Lang = 'he' | 'en';

type DisplayTextMapping = {
  projectType: Record<ProjectType, string>;
  routeNames: Record<Routes, string>;
};

export const DISPLAY_TEXTS: Record<Lang, DisplayTextMapping> = {
  he: {
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
    },
  },
  en: {
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
    },
  },
};
