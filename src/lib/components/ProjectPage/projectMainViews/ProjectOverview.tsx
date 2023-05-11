import { useState } from 'react';
import { Card } from '../../commons/Card';
import { Tabs } from '../../commons/Tabs';
import { PROJECT_ACTUALS_VIEW_TABS } from '../ProjectPage.consts';
import { ProjectActualsViews } from '@/lib/consts/projects';
import { ProjectOverviewCard } from './ProjectOverviewCard';

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
    </>
  );
};
