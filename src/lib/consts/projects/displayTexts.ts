import { ProjectFields } from './ProjectFields';
import { EProjectViews } from './ProjectViews';
import { Lang } from '../displayTexts';
import { ProjectType } from './ProjectType';
import { IProjectStatus } from './ProjectStatus';

type DisplayTextMapping = {
  fields: Record<ProjectFields, string>;
  tabs: Record<EProjectViews, string>;
  projectPageTitle: string;
  projectTypes: Record<ProjectType, string>;
  projectStatus: Record<IProjectStatus, string>;
  getAddNewText: (projectType: ProjectType) => string;
};

export const PROJECT_DISPLAY_TEXTS: Record<Lang, DisplayTextMapping> = {
  he: {
    projectPageTitle: 'דשבורד פרוייקט',
    projectStatus: {
      [IProjectStatus.Active]: 'פעיל',
      [IProjectStatus.NonActive]: 'לא פעיל',
    },
    fields: {
      [ProjectFields.Title]: 'פרוייקט',
      [ProjectFields.Address]: 'מיקום',
      [ProjectFields.ProjectType]: 'סוג פרוייקט',
      [ProjectFields.SDate]: 'תחילת פרוייקט',
      [ProjectFields.EDate]: 'סיום מתוכנן',
      [ProjectFields.NumberOfPeriods]: 'מס תקופות מתוכנן',
      [ProjectFields.Description]: 'תאור הפרוייקט',
      [ProjectFields.Manager]: 'מנהל ביצוע',
      [ProjectFields.SeniorManager]: 'מנהל פרוייקט בכיר',
      [ProjectFields.Entrepreneur]: 'חברה יזמית',
      [ProjectFields.Executor]: 'חברה מבצעת',
      [ProjectFields.NumberOfBuildings]: 'מספר בניינים',
      [ProjectFields.Basements]: 'מרתפים',
      [ProjectFields.NumberOfApatrments]: 'מספר דירות',
      [ProjectFields.Status]: 'סטטוס',
      [ProjectFields.TotalAgreementSum]: 'סכום הסכם',
      [ProjectFields.TotalActualsSum]: 'סכום מצטבר מאושר',
      [ProjectFields.DonePercentage]: 'הושלם',
    },
    tabs: {
      [EProjectViews.Confirms]: 'סטטוס אישורים',
      [EProjectViews.Accounts]: 'סטטוס חשבונות',
      [EProjectViews.Contracts]: 'פרטי חוזים',
      [EProjectViews.Attachments]: 'צרופות',
      [EProjectViews.OddJobs]: 'עבודות קטנות',
      [EProjectViews.Appartments]: 'דירות',
    },
    projectTypes: {
      [ProjectType.Residential]: 'מגורים',
      [ProjectType.PublicSpace]: 'ציבורי',
      [ProjectType.Entrepreneurship]: 'יזמות',
    },
    getAddNewText: (projectType) =>
      `+ פרוייקט [${PROJECT_DISPLAY_TEXTS.he.projectTypes[projectType]}]`,
  },
  en: {
    projectPageTitle: 'Project Dashboard',
    projectStatus: {
      [IProjectStatus.Active]: 'Active',
      [IProjectStatus.NonActive]: 'Not Active',
    },
    fields: {
      [ProjectFields.Title]: 'Project Name',
      [ProjectFields.Address]: 'Location',
      [ProjectFields.ProjectType]: 'projectType',
      [ProjectFields.SDate]: 'sDate',
      [ProjectFields.EDate]: 'eDate',
      [ProjectFields.NumberOfPeriods]: 'numberOfPeriods',
      [ProjectFields.Description]: 'description',
      [ProjectFields.Manager]: 'manager',
      [ProjectFields.SeniorManager]: 'seniorManager',
      [ProjectFields.Entrepreneur]: 'entrepreneur',
      [ProjectFields.Executor]: 'executor',
      [ProjectFields.NumberOfBuildings]: 'numberOfBuildings',
      [ProjectFields.Basements]: 'basements',
      [ProjectFields.NumberOfApatrments]: 'numberOfApatrments',
      [ProjectFields.Status]: 'status',
      [ProjectFields.TotalAgreementSum]: 'totalAgreementSum',
      [ProjectFields.TotalActualsSum]: 'totalActualsSum',
      [ProjectFields.DonePercentage]: 'donePercentage',
    },
    tabs: {
      [EProjectViews.Confirms]: 'Confirms',
      [EProjectViews.Accounts]: 'Accounts',
      [EProjectViews.Contracts]: 'Contracts',
      [EProjectViews.Attachments]: 'Attachments',
      [EProjectViews.OddJobs]: 'Odd Jobs',
      [EProjectViews.Appartments]: 'Appartments',
    },
    projectTypes: {
      [ProjectType.Residential]: 'Residential',
      [ProjectType.PublicSpace]: 'Public Space',
      [ProjectType.Entrepreneurship]: 'Entrepreneurship',
    },
    getAddNewText: (projectType) =>
      `+ project [${PROJECT_DISPLAY_TEXTS.en.projectTypes[projectType]}]`,
  },
};
