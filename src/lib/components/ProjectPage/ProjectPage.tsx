import { PageLayout } from '../PageLayout';
import { DISPLAY_TEXTS } from '../../consts/displayTexts';
import { Routes } from '../../consts/routes';
import { IProjectPageProps } from './ProjectPage.types';
import {
  PROJECTS_BREADCRUMB,
  getProjectBredcrumb,
} from '@/lib/consts/breadcrumbs';

export const ProjectPage = ({ projectId, projectType }: IProjectPageProps) => {
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
    </PageLayout>
  );
};
