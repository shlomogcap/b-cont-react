import { ReactElement, useState } from 'react';
import { Tabs } from '../../../commons/Tabs';
import { PROJECT_ACTUALS_VIEW_TABS } from '../../ProjectPage.consts';
import { ProjectActualsViews } from '@/lib/consts/projects';
import { ProjectOverviewCard } from '../ProjectOverviewCard';
import {
  ProjectConfirmsCard,
  ProjectAccountsCard,
  ProjectContractsCard,
  ProjectAttachmentsCard,
  ProjectOddJobsCard,
} from './tabs';

const PROJECT_OVERVIEW_TABS_MAP: Record<ProjectActualsViews, ReactElement> = {
  [ProjectActualsViews.Confirms]: <ProjectConfirmsCard />,
  [ProjectActualsViews.Accounts]: <ProjectAccountsCard />,
  [ProjectActualsViews.Contracts]: <ProjectContractsCard />,
  [ProjectActualsViews.Attachments]: <ProjectAttachmentsCard />,
  [ProjectActualsViews.OddJobs]: <ProjectOddJobsCard />,
};

export const ProjectOverview = () => {
  const [projectActualsViewActiveTab, setProjectActualsViewActiveTab] =
    useState(ProjectActualsViews.Confirms);
  return (
    <>
      <ProjectOverviewCard />
      <div style={{ marginTop: '2rem', gridColumn: '1 /-1' }} />
      <Tabs
        activeTab={projectActualsViewActiveTab}
        setActiveTab={setProjectActualsViewActiveTab}
        tabs={PROJECT_ACTUALS_VIEW_TABS}
      />
      {PROJECT_OVERVIEW_TABS_MAP[projectActualsViewActiveTab]}
    </>
  );
};
