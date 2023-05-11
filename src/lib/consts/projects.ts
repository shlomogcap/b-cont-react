import { Lang } from '@/lib/consts/displayTexts';

export enum ProjectFields {
  Title = 'title',
  Address = 'address',
  ProjectType = 'projectType',
  SDate = 'sDate',
  EDate = 'eDate',
  NumberOfPeriods = 'numberOfPeriods',
  Description = 'description',
  Manager = 'manager',
  SeniorManager = 'seniorManager',
  Entrepreneur = 'entrepreneur',
  Executor = 'executor',
  NumberOfBuildings = 'numberOfBuildings',
  Basements = 'basements',
  NumberOfApatrments = 'numberOfApatrments',
  Status = 'status',
  TotalActualsSum = 'totalActualsSum',
  TotalAgreementSum = 'totalAgreementSum',
  DonePercentage = 'donePercentage',
}

export enum ProjectMainViews {
  Overview = 'overview',
  Appartments = 'appartments',
}

export enum ProjectActualsViews {
  Confirms = 'confirms',
  Accounts = 'accounts',
  Contracts = 'contracts',
  Attachments = 'attachments',
  OddJobs = 'oddJobs',
}

type DisplayTextMapping = {
  fields: Record<ProjectFields, string>;
  mainViews: Record<ProjectMainViews, string>;
  actualViews: Record<ProjectActualsViews, string>;
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
      [ProjectMainViews.Overview]: 'פרטי הפרוייקט',
      [ProjectMainViews.Appartments]: 'דירות',
    },
    actualViews: {
      [ProjectActualsViews.Confirms]: 'סטטוס אישורים',
      [ProjectActualsViews.Accounts]: 'סטטוס חשבונות',
      [ProjectActualsViews.Contracts]: 'פרטי חוזים',
      [ProjectActualsViews.Attachments]: 'צרופות',
      [ProjectActualsViews.OddJobs]: 'עבודות קטנות',
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
  },
};
