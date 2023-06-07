import { useProjectsContext } from '@/lib/context/projectsContext';
import { IContractPageProps } from './ContractPage.types';
import { PageLayout } from '../PageLayout';
import { APP_BREADCRUMB } from '@/lib/consts/breadcrumbs';
import { useProjectTypeBreadcrumb } from '../ProjectPage/useProjectTypeBreadcrumb';
import { IRoutesNames } from '@/lib/consts/routes';
import { useProjectNavList } from '@/lib/hooks/useProjectNavList';
import { EmptyState } from '../commons/EmptyState';
import { DISPLAY_TEXTS, ITableStates } from '@/lib/consts/displayTexts';
import { PropsWithChildren } from 'react';

export const ContractPage = ({
  projectId,
  projectType,
  children,
}: PropsWithChildren<IContractPageProps>) => {
  const { isLoading } = useProjectsContext();
  const title = 'CONTRACT PAGE';
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
        children
      )}
    </PageLayout>
  );
};
