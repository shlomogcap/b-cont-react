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
import { useContractContext } from '@/lib/context/contractContext';
import {
  CONTRACTS_DISPLAY_TEXTS,
  IContractFields,
} from '@/lib/consts/contracts';
import { useContractStageBreadcrumb } from '../ProjectPage/useContractStageBreadcrumb';
import { Card } from '../commons/Card';
import { ContractForm } from '../ContractForm';

export const ContractPage = ({
  projectId,
  projectType,
  stage,
  children,
}: PropsWithChildren<IContractPageProps>) => {
  const { isLoading } = useProjectsContext();
  const title = 'CONTRACT PAGE';
  const { data: projects } = useProjectsContext();
  const {
    data: { contract },
  } = useContractContext();
  const project = projectId ? projects.find((p) => p.id === projectId) : null;
  const projectBreadCrumbText = String(project?.title || projectId);

  const projectsTypeBreadCrumb = useProjectTypeBreadcrumb(
    projectType,
    IRoutesNames.ProjectsWithType,
  );
  const contractStageBreadcrumb = useContractStageBreadcrumb(stage);

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
        {
          text: contract?.[IContractFields.Title] ?? '---',
          id: IRoutesNames.Contract,
        },
        contractStageBreadcrumb,
      ]}
    >
      {isLoading ? (
        <EmptyState
          animation='pulse'
          content={DISPLAY_TEXTS.he.tableStates[ITableStates.Loading]}
        />
      ) : (
        <>
          <Card title={CONTRACTS_DISPLAY_TEXTS.he.contractFormTitle}>
            <ContractForm id={contract?.id!} />
          </Card>
          {children}
        </>
      )}
    </PageLayout>
  );
};
