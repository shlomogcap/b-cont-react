import { PageLayout } from '../PageLayout';
import { DISPLAY_TEXTS } from '../../consts/displayTexts';
import { Routes } from '../../consts/routes';
import { IProjectPageProps } from './ProjectPage.types';
import { PROJECTS_BREADCRUMB } from '@/lib/consts/breadcrumbs';
import { Tabs } from '../commons/Tabs';
import { ReactElement, useState } from 'react';
import { PROJECT_DISPLAY_TEXTS, ProjectMainViews } from '@/lib/consts/projects';
import { PROJECT_MAIN_VIEW_TABS } from './ProjectPage.consts';
import { ProjectOverview } from './projectMainViews/ProjectOverview';
import { ProjectAppartments } from './projectMainViews/ProjectAppartments';
import { useProjectsContext } from '@/lib/context/projectsContext';
import { Card } from '../commons/Card';
import { ProjectForm } from '../ProjectForm';

const PROJECT_MAIN_VIEWS: Record<ProjectMainViews, ReactElement> = {
  [ProjectMainViews.Overview]: <ProjectOverview />,
  [ProjectMainViews.Appartments]: <ProjectAppartments />,
};

export const ProjectPage = ({ projectId, projectType }: IProjectPageProps) => {
  const [projectMainViewActiveTab, setProjectMainViewActiveTab] = useState(
    ProjectMainViews.Overview,
  );
  const title = DISPLAY_TEXTS.he.routeNames[Routes.Projects];
  const { data } = useProjectsContext();
  const project = projectId ? data.find((p) => p.id === projectId) : null;
  const isEditMode = Boolean(project);
  return (
    <PageLayout
      title={title}
      breadcrubms={[
        PROJECTS_BREADCRUMB,
        {
          text: isEditMode ? String(project?.title || projectId) : `+ ${title}`,
          id: Routes.Project,
        },
      ]}
    >
      {isEditMode ? (
        <>
          <Tabs
            activeTab={projectMainViewActiveTab}
            setActiveTab={setProjectMainViewActiveTab}
            tabs={PROJECT_MAIN_VIEW_TABS}
          />
          {PROJECT_MAIN_VIEWS[projectMainViewActiveTab]}
        </>
      ) : (
        <Card title={PROJECT_DISPLAY_TEXTS.he.getAddNewText(projectType)}>
          <ProjectForm />
        </Card>
      )}
    </PageLayout>
  );
};
