import { PageLayout } from '../PageLayout';
import { DISPLAY_TEXTS } from '../../consts/displayTexts';
import {
  IRoutesNames,
  PROJECT_ID_QUERY,
  PROJECT_TYPE_QUERY,
} from '../../consts/routes';
import { IProjectPageProps } from './ProjectPage.types';
import { PROJECTS_BREADCRUMB } from '@/lib/consts/breadcrumbs';
import { ProjectOverview } from './ProjectOverview';
import { useProjectsContext } from '@/lib/context/projectsContext';
import { EmptyState } from '../commons/EmptyState';
import { ProjectFields } from '@/lib/consts/projects';
import { useModalContext } from '@/lib/context/ModalProvider/ModalProvider';
import { useRouter } from 'next/router';

export const ProjectPage = ({ projectId }: IProjectPageProps) => {
  const { isLoading } = useProjectsContext();
  const title = DISPLAY_TEXTS.he.routeNames[IRoutesNames.Projects];
  const { data } = useProjectsContext();
  const project = projectId ? data.find((p) => p.id === projectId) : null;
  const projectBreadCrumbText = String(project?.title || projectId);
  const router = useRouter();
  const { closeModal } = useModalContext();

  const projectsNavList = data
    .filter(({ id }) => id !== projectId)
    .map((project) => ({
      id: String(project.id),
      text: project[ProjectFields.Title],
      onClick: () => {
        router.push({
          pathname: IRoutesNames.Project,
          query: {
            [PROJECT_ID_QUERY]: project.id,
            [PROJECT_TYPE_QUERY]: project.projectType,
          },
        });
        closeModal();
      },
    }));
  return (
    <PageLayout
      title={title}
      breadcrubms={[
        PROJECTS_BREADCRUMB,
        {
          text: isLoading ? '---' : projectBreadCrumbText,
          id: IRoutesNames.Project,
          navList: projectsNavList,
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
