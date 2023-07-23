import { ReactElement, useState } from 'react';
import { Tabs } from '../commons/Tabs';
import { PROJECT_VIEW_TABS } from './ProjectPage.consts';
import { EProjectViews, PROJECT_DISPLAY_TEXTS } from '@/lib/consts/projects';
import {
  ProjectConfirms,
  ProjectAccounts,
  ProjectContracts,
  ProjectAttachments,
  ProjectOddJobs,
  ProjectAppartments,
} from './projectTabs';
import { Card } from '@/lib/components/commons/Card';
import { ProjectForm } from '@/lib/components/ProjectForm';
import { queryParamToString } from '@/lib/utils/queryParamToString';
import { useRouter } from 'next/router';
import { PROJECT_ID_QUERY } from '@/lib/consts/routes';
import { SearchableContextProvider } from '../commons/SearchBar/searchableContext';

const PROJECT_OVERVIEW_TABS_MAP: Record<EProjectViews, ReactElement> = {
  [EProjectViews.Confirms]: <ProjectConfirms />,
  [EProjectViews.Accounts]: <ProjectAccounts />,
  [EProjectViews.Contracts]: <ProjectContracts />,
  [EProjectViews.Attachments]: <ProjectAttachments />,
  [EProjectViews.OddJobs]: <ProjectOddJobs />,
  [EProjectViews.Appartments]: <ProjectAppartments />,
};

export const ProjectOverview = () => {
  const { query } = useRouter();
  const [projectViewsActiveTab, setProjectViewsActiveTab] = useState(
    EProjectViews.Confirms,
  );

  return (
    <>
      <Card title={PROJECT_DISPLAY_TEXTS.he.projectPageTitle}>
        <ProjectForm id={queryParamToString(query, PROJECT_ID_QUERY)} />
      </Card>
      <div style={{ marginTop: '1.5rem', gridColumn: '1 /-1' }} />
      <Tabs
        activeTab={projectViewsActiveTab}
        setActiveTab={setProjectViewsActiveTab}
        tabs={PROJECT_VIEW_TABS}
      />
      <SearchableContextProvider>
        {PROJECT_OVERVIEW_TABS_MAP[projectViewsActiveTab]}
      </SearchableContextProvider>
    </>
  );
};
