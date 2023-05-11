import { PageLayout } from '../PageLayout';
import { DISPLAY_TEXTS } from '../../consts/displayTexts';
import { Routes } from '../../consts/routes';
import { IProjectPageProps } from './ProjectPage.types';
import { PROJECTS_BREADCRUMB } from '@/lib/consts/breadcrumbs';
import { Card } from '../commons/Card';
import { Tabs } from '../commons/Tabs';
import { useState } from 'react';

enum ProjectViews {
  Overview = 'overview',
  Appartments = 'appartments',
}

export const ProjectPage = ({ projectId, projectType }: IProjectPageProps) => {
  const [activeTab, setActiveTab] = useState<ProjectViews>(
    ProjectViews.Overview,
  );
  const title = DISPLAY_TEXTS.he.routeNames[Routes.Projects];
  const projectName = '';
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
      Project With ID {projectId}
      <Tabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={[
          { id: ProjectViews.Overview, text: 'פרטי הפרוייקט' },
          { id: ProjectViews.Appartments, text: 'דירות' },
        ]}
      />
      <Card title='פרטי הפרוייקט'>holl</Card>
    </PageLayout>
  );
};
