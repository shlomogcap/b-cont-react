import { useProjectsContext } from '@/lib/context/projectsContext';
import { IContractPageProps } from './ContractPage.types';
import { PageLayout } from '../PageLayout';
import { APP_BREADCRUMB } from '@/lib/consts/breadcrumbs';
import { useProjectTypeBreadcrumb } from '../ProjectPage/useProjectTypeBreadcrumb';
import { ERoutesNames } from '@/lib/consts/routes';
import { useProjectNavList } from '@/lib/hooks/useProjectNavList';
import { EmptyState } from '../commons/EmptyState';
import { DISPLAY_TEXTS, ETableStates } from '@/lib/consts/displayTexts';
import { PropsWithChildren } from 'react';
import { useContractContext } from '@/lib/context/contractContext';
import {
  CONTRACTS_DISPLAY_TEXTS,
  EContractFields,
  EContractStage,
  EContractStatus,
} from '@/lib/consts/contracts';
import { useContractStageBreadcrumb } from '../ProjectPage/useContractStageBreadcrumb';
import { Card } from '../commons/Card';
import { ContractForm } from '../ContractForm';
import { EProjectType, PROJECT_DISPLAY_TEXTS } from '@/lib/consts/projects';
import {
  StyledContratCardTitle,
  StyledEditContractIcon,
} from './ContractPage.styled';

export const ContractPage = ({
  projectId,
  projectType,
  stage,
  children,
}: PropsWithChildren<IContractPageProps>) => {
  const { isLoading } = useProjectsContext();
  const { data: projects } = useProjectsContext();
  const {
    data: { contract, handleChangeContractToPlan },
  } = useContractContext();
  const project = projectId ? projects.find((p) => p.id === projectId) : null;
  const projectBreadCrumbText = String(project?.title || projectId);

  const projectsTypeBreadCrumb = useProjectTypeBreadcrumb(
    projectType,
    ERoutesNames.ProjectsWithType,
  );
  const contractStageBreadcrumb = useContractStageBreadcrumb(stage);
  const title = `${
    PROJECT_DISPLAY_TEXTS.he.projectTypes[project?.projectType as EProjectType]
  } / ${CONTRACTS_DISPLAY_TEXTS.he.contractPagesTitle[stage]}`;

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
          id: ERoutesNames.Project,
          navList: projectsNavList,
        },
        {
          text: contract?.[EContractFields.Title] ?? '---',
          id: ERoutesNames.Contract,
        },
        contractStageBreadcrumb,
      ]}
    >
      {isLoading ? (
        <EmptyState
          animation='pulse'
          content={DISPLAY_TEXTS.he.tableStates[ETableStates.Loading]}
        />
      ) : (
        <>
          <Card
            title={
              <StyledContratCardTitle>
                {CONTRACTS_DISPLAY_TEXTS.he.contractFormTitle}
                {contract![EContractFields.Status] ===
                  EContractStatus.Active && (
                  <StyledEditContractIcon
                    onClick={handleChangeContractToPlan}
                  />
                )}
              </StyledContratCardTitle>
            }
          >
            <ContractForm
              id={contract?.id as string}
              readOnly={!(stage === EContractStage.Plan)}
            />
          </Card>
          {children}
        </>
      )}
    </PageLayout>
  );
};
