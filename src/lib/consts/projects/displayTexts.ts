import { EProjectFields } from './ProjectFields';
import { EProjectViews } from './ProjectViews';
import { ILang } from '../displayTexts';
import { EProjectType } from './ProjectType';
import { EProjectStatus } from './ProjectStatus';

type IDisplayTextMapping = {
  fields: Record<EProjectFields, string>;
  tabs: Record<EProjectViews, string>;
  projectPageTitle: string;
  projectTypes: Record<EProjectType, string>;
  projectStatus: Record<EProjectStatus, string>;
  getAddNewText: (projectType: EProjectType) => string;
};

export const PROJECT_DISPLAY_TEXTS: Record<ILang, IDisplayTextMapping> = {
  he: {
    projectPageTitle: 'דשבורד פרוייקט',
    projectStatus: {
      [EProjectStatus.Active]: 'פעיל',
      [EProjectStatus.NonActive]: 'לא פעיל',
    },
    fields: {
      [EProjectFields.Title]: 'פרוייקט',
      [EProjectFields.Address]: 'מיקום',
      [EProjectFields.ProjectType]: 'סוג פרוייקט',
      [EProjectFields.SDate]: 'תחילת פרוייקט',
      [EProjectFields.EDate]: 'סיום מתוכנן',
      [EProjectFields.NumberOfPeriods]: 'מס תקופות מתוכנן',
      [EProjectFields.Description]: 'תאור הפרוייקט',
      [EProjectFields.Manager]: 'מנהל ביצוע',
      [EProjectFields.SeniorManager]: 'מנהל פרוייקט בכיר',
      [EProjectFields.Entrepreneur]: 'חברה יזמית',
      [EProjectFields.Executor]: 'חברה מבצעת',
      [EProjectFields.NumberOfBuildings]: 'מספר בניינים',
      [EProjectFields.Basements]: 'מרתפים',
      [EProjectFields.NumberOfApatrments]: 'מספר דירות',
      [EProjectFields.Status]: 'סטטוס',
      [EProjectFields.TotalAgreementSum]: 'סכום הסכם',
      [EProjectFields.TotalActualsSum]: 'סכום מצטבר מאושר',
      [EProjectFields.DonePercentage]: 'הושלם',
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
      [EProjectType.Residential]: 'מגורים',
      [EProjectType.PublicSpace]: 'ציבורי',
      [EProjectType.Entrepreneurship]: 'יזמות',
    },
    getAddNewText: (projectType) =>
      `+ פרוייקט [${PROJECT_DISPLAY_TEXTS.he.projectTypes[projectType]}]`,
  },
  en: {
    projectPageTitle: 'Project Dashboard',
    projectStatus: {
      [EProjectStatus.Active]: 'Active',
      [EProjectStatus.NonActive]: 'Not Active',
    },
    fields: {
      [EProjectFields.Title]: 'Project Name',
      [EProjectFields.Address]: 'Location',
      [EProjectFields.ProjectType]: 'projectType',
      [EProjectFields.SDate]: 'sDate',
      [EProjectFields.EDate]: 'eDate',
      [EProjectFields.NumberOfPeriods]: 'numberOfPeriods',
      [EProjectFields.Description]: 'description',
      [EProjectFields.Manager]: 'manager',
      [EProjectFields.SeniorManager]: 'seniorManager',
      [EProjectFields.Entrepreneur]: 'entrepreneur',
      [EProjectFields.Executor]: 'executor',
      [EProjectFields.NumberOfBuildings]: 'numberOfBuildings',
      [EProjectFields.Basements]: 'basements',
      [EProjectFields.NumberOfApatrments]: 'numberOfApatrments',
      [EProjectFields.Status]: 'status',
      [EProjectFields.TotalAgreementSum]: 'totalAgreementSum',
      [EProjectFields.TotalActualsSum]: 'totalActualsSum',
      [EProjectFields.DonePercentage]: 'donePercentage',
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
      [EProjectType.Residential]: 'Residential',
      [EProjectType.PublicSpace]: 'Public Space',
      [EProjectType.Entrepreneurship]: 'Entrepreneurship',
    },
    getAddNewText: (projectType) =>
      `+ project [${PROJECT_DISPLAY_TEXTS.en.projectTypes[projectType]}]`,
  },
};
