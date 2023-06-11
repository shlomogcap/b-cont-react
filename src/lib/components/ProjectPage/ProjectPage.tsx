import { PageLayout } from '../PageLayout';
import { DISPLAY_TEXTS, ITableStates } from '../../consts/displayTexts';
import { IRoutesNames } from '../../consts/routes';
import { IProjectPageProps } from './ProjectPage.types';
import { APP_BREADCRUMB } from '@/lib/consts/breadcrumbs';
import { ProjectOverview } from './ProjectOverview';
import { useProjectsContext } from '@/lib/context/projectsContext';
import { EmptyState } from '../commons/EmptyState';
import { useProjectTypeBreadcrumb } from './useProjectTypeBreadcrumb';
import { useProjectNavList } from '@/lib/hooks/useProjectNavList';

export const ProjectPage = ({ projectId, projectType }: IProjectPageProps) => {
  const { isLoading } = useProjectsContext();
  const title = DISPLAY_TEXTS.he.routeNames[IRoutesNames.ProjectsWithType];
  const { data: projects } = useProjectsContext();
  const project = projectId ? projects.find((p) => p.id === projectId) : null;
  const projectBreadCrumbText = String(project?.title || projectId);

  const projectsTypeBreadCrumb = useProjectTypeBreadcrumb(
    projectType,
    IRoutesNames.ProjectsWithType,
  );

  const projectsNavList = useProjectNavList({
    projects,
    projectId,
    projectType,
  });
  return (
    <PageLayout
      title={title}
      breadcrubms={[
        APP_BREADCRUMB,
        projectsTypeBreadCrumb,
        {
          text: isLoading ? '---' : projectBreadCrumbText,
          id: IRoutesNames.Project,
          navList: projectsNavList,
        },
      ]}
    >
      {isLoading ? (
        <EmptyState
          animation='pulse'
          content={DISPLAY_TEXTS.he.tableStates[ITableStates.Loading]}
        />
      ) : (
        <ProjectOverview />
      )}
    </PageLayout>
  );
};
