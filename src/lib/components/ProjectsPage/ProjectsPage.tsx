import { PageLayout } from '../PageLayout';
import { DISPLAY_TEXTS } from '../../consts/displayTexts';
import { IRoutesNames } from '../../consts/routes';
import { IProjectPageProps } from './ProjectsPage.types';
import { ProjectsTable } from './ProjectsTable';
import { PROJECT_DISPLAY_TEXTS } from '@/lib/consts/projects';
import { APP_BREADCRUMB } from '@/lib/consts/breadcrumbs';
import { useProjectTypeBreadcrumb } from '../ProjectPage/useProjectTypeBreadcrumb';

export const ProjectsPage = ({ projectType }: IProjectPageProps) => {
  const title = projectType
    ? PROJECT_DISPLAY_TEXTS.he.projectTypes[projectType]
    : DISPLAY_TEXTS.he.routeNames[IRoutesNames.ProjectsWithType];
  const projectsTypeBreadcrumbd = useProjectTypeBreadcrumb(projectType);

  return (
    <PageLayout
      title={title}
      breadcrubms={[APP_BREADCRUMB, projectsTypeBreadcrumbd]}
    >
      <ProjectsTable projectType={projectType} />
    </PageLayout>
  );
};
