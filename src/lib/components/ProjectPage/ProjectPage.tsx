import { PageLayout } from '../PageLayout';
import { DISPLAY_TEXTS } from '../../consts/displayTexts';
import { IRoutesNames } from '../../consts/routes';
import { IProjectPageProps } from './ProjectPage.types';
import { PROJECTS_BREADCRUMB } from '@/lib/consts/breadcrumbs';
import { ProjectOverview } from './ProjectOverview';
import { useProjectsContext } from '@/lib/context/projectsContext';
import { EmptyState } from '../commons/EmptyState';

export const ProjectPage = ({ projectId }: IProjectPageProps) => {
  const { isLoading } = useProjectsContext();
  const title = DISPLAY_TEXTS.he.routeNames[IRoutesNames.Projects];
  const { data } = useProjectsContext();
  const project = projectId ? data.find((p) => p.id === projectId) : null;
  const projectBreadCrumbText = String(project?.title || projectId);
  return (
    <PageLayout
      title={title}
      breadcrubms={[
        PROJECTS_BREADCRUMB,
        {
          text: isLoading ? '---' : projectBreadCrumbText,
          id: IRoutesNames.Project,
        },
      ]}
    >
      {isLoading ? (
        <EmptyState animation='pulse' content={'Loading...'} />
      ) : (
        <ProjectOverview />
      )}
    </PageLayout>
  );
};
