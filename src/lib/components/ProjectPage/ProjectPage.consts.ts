import {
  PROJECT_DISPLAY_TEXTS,
  ProjectActualsViews,
  ProjectMainViews,
} from '@/lib/consts/project';

export const PROJECT_MAIN_VIEW_TABS = [
  {
    id: ProjectMainViews.Overview,
    text: PROJECT_DISPLAY_TEXTS.he.mainViews[ProjectMainViews.Overview],
  },
  {
    id: ProjectMainViews.Appartments,
    text: PROJECT_DISPLAY_TEXTS.he.mainViews[ProjectMainViews.Appartments],
  },
];

export const PROJECT_ACTUALS_VIEW_TABS = [
  {
    id: ProjectActualsViews.Confirms,
    text: PROJECT_DISPLAY_TEXTS.he.actualViews[ProjectActualsViews.Confirms],
  },
  {
    id: ProjectActualsViews.Accounts,
    text: PROJECT_DISPLAY_TEXTS.he.actualViews[ProjectActualsViews.Accounts],
  },
  {
    id: ProjectActualsViews.Contracts,
    text: PROJECT_DISPLAY_TEXTS.he.actualViews[ProjectActualsViews.Contracts],
  },
  {
    id: ProjectActualsViews.Attachments,
    text: PROJECT_DISPLAY_TEXTS.he.actualViews[ProjectActualsViews.Attachments],
  },
  {
    id: ProjectActualsViews.OddJobs,
    text: PROJECT_DISPLAY_TEXTS.he.actualViews[ProjectActualsViews.OddJobs],
  },
];
