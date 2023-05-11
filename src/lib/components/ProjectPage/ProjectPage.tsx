import { PageLayout } from '../PageLayout';
import { DISPLAY_TEXTS } from '../../consts/displayTexts';
import { Routes } from '../../consts/routes';
import { IProjectPageProps } from './ProjectPage.types';
import { PROJECTS_BREADCRUMB } from '@/lib/consts/breadcrumbs';
import { Tabs } from '../commons/Tabs';
import { ReactElement, ReactNode, useState } from 'react';
import { ProjectMainViews } from '@/lib/consts/project';
import { PROJECT_MAIN_VIEW_TABS } from './ProjectPage.consts';
import { MOCK_PROJECTS_DATA } from '@/lib/mock/projects';
import { ProjectOverview } from './projectMainViews/ProjectOverview';
import { ProjectAppartments } from './projectMainViews/ProjectAppartments';

const PROJECT_MAIN_VIEWS: Record<ProjectMainViews, ReactElement> = {
  [ProjectMainViews.Overview]: <ProjectOverview />,
  [ProjectMainViews.Appartments]: <ProjectAppartments />,
};

export const ProjectPage = ({ projectId, projectType }: IProjectPageProps) => {
  const [projectMainViewActiveTab, setProjectMainViewActiveTab] = useState(
    ProjectMainViews.Overview,
  );
  const title = DISPLAY_TEXTS.he.routeNames[Routes.Projects];
  const projectName =
    MOCK_PROJECTS_DATA.find((p) => p.id === projectId)?.title ?? '';
  return (
    <PageLayout
      title={title}
      breadcrubms={[
        PROJECTS_BREADCRUMB,
        {
          text: projectName || projectId,
          id: Routes.Project,
        },
      ]}
    >
      <Tabs
        activeTab={projectMainViewActiveTab}
        setActiveTab={setProjectMainViewActiveTab}
        tabs={PROJECT_MAIN_VIEW_TABS}
      />
      {PROJECT_MAIN_VIEWS[projectMainViewActiveTab]}
    </PageLayout>
  );
};
