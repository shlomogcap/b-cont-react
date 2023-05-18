import { ProjectFields } from './ProjectFields';
import { ProjectMainViews } from './ProjectMainView';
import { ProjectActualsViews } from './ProjectActualsViews';
import { Lang } from '../displayTexts';
import { ProjectType } from './ProjectType';

type DisplayTextMapping = {
  fields: Record<ProjectFields, string>;
  mainViews: Record<ProjectMainViews, string>;
  actualViews: Record<ProjectActualsViews, string>;
  projectTypes: Record<ProjectType, string>;
};

export const PROJECT_DISPLAY_TEXTS: Record<Lang, DisplayTextMapping> = {
  he: {
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
    mainViews: {
      [ProjectMainViews.Overview]: 'דשבורד פרוייקט',
      [ProjectMainViews.Appartments]: 'אינדקס תכולת פרוייקט',
    },
    actualViews: {
      [ProjectActualsViews.Confirms]: 'סטטוס אישורים',
      [ProjectActualsViews.Accounts]: 'סטטוס חשבונות',
      [ProjectActualsViews.Contracts]: 'פרטי חוזים',
      [ProjectActualsViews.Attachments]: 'צרופות',
      [ProjectActualsViews.OddJobs]: 'עבודות קטנות',
    },
    projectTypes: {
      [ProjectType.Residential]: 'מגורים',
      [ProjectType.PublicSpace]: 'ציבורי',
      [ProjectType.Entrepreneurship]: 'יזמות',
    },
  },
  en: {
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
    mainViews: {
      [ProjectMainViews.Overview]: 'Overview',
      [ProjectMainViews.Appartments]: 'Appartments',
    },
    actualViews: {
      [ProjectActualsViews.Confirms]: 'Confirms',
      [ProjectActualsViews.Accounts]: 'Accounts',
      [ProjectActualsViews.Contracts]: 'Contracts',
      [ProjectActualsViews.Attachments]: 'Attachments',
      [ProjectActualsViews.OddJobs]: 'Oddjobs',
    },
    projectTypes: {
      [ProjectType.Residential]: 'Residential',
      [ProjectType.PublicSpace]: 'Public Space',
      [ProjectType.Entrepreneurship]: 'Entrepreneurship',
    },
  },
};
