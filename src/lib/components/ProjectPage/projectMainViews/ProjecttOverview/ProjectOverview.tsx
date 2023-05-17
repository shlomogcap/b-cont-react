import { ReactElement, useState } from 'react';
import { Card } from '../../../commons/Card';
import { Tabs } from '../../../commons/Tabs';
import { PROJECT_ACTUALS_VIEW_TABS } from '../../ProjectPage.consts';
import { ProjectOverviewCard } from '../ProjectOverviewCard';
import { ProjectActualsViews } from '@/lib/consts/projects';

const PROJECT_OVERVIEW_TABS_MAP: Record<ProjectActualsViews, ReactElement> = {
  [ProjectActualsViews.Confirms]: <Card>Confirms</Card>,
  [ProjectActualsViews.Accounts]: <Card>Accounts</Card>,
  [ProjectActualsViews.Contracts]: <Card>Contracts</Card>,
  [ProjectActualsViews.Attachments]: <Card>Attachments</Card>,
  [ProjectActualsViews.OddJobs]: <Card>OddJobs</Card>,
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
