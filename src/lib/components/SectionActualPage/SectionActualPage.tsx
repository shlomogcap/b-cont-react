import { useProjectsContext } from '@/lib/context/projectsContext';
import { ISectionActualPageProps } from './SectionActualPage.types';
import { useContractContext } from '@/lib/context/contractContext';
import { useProjectTypeBreadcrumb } from '../ProjectPage/useProjectTypeBreadcrumb';
import { useContractStageBreadcrumb } from '../ProjectPage/useContractStageBreadcrumb';
import { useProjectNavList } from '@/lib/hooks/useProjectNavList';
import { EmptyState } from '../commons/EmptyState';
import { DISPLAY_TEXTS, ETableStates } from '@/lib/consts/displayTexts';
import { ERoutesNames } from '@/lib/consts/routes';
import { PROJECT_DISPLAY_TEXTS } from '@/lib/consts/projects';
import {
  CONTRACTS_DISPLAY_TEXTS,
  EContractFields,
} from '@/lib/consts/contracts';
import { PageLayout } from '../PageLayout';
import { APP_BREADCRUMB } from '@/lib/consts/breadcrumbs';
import { Card } from '../commons/Card';
import { ContractSectionFormFields } from '../ContractSectionForm/ContractSectionFormFields';
import { prepareWorkspaceOptions } from '../ContractSectionForm/ContractSectionForm.utils';
import { FormProvider, useForm } from 'react-hook-form';
import { useSectionContext } from '@/lib/context/sectionContext';
import { useProjectContractsContext } from '@/lib/context/projectContractsContext';
import { useContractsNavList } from '@/lib/hooks/useContractsNavList';
import { ESectionFields } from '@/lib/consts/sections';
import { EAccountFields } from '@/lib/consts/accounts/AccountFields';

export const SectionActualPage = ({
  projectId,
  projectType,
  stage,
}: ISectionActualPageProps) => {
  const { data: projects, isLoading: isLoadingProjects } = useProjectsContext();
  const { data: contracts, isLoading: isLoadingContracts } =
    useProjectContractsContext();
  const {
    data: { contract, workspaces, accounts },
  } = useContractContext();
  const {
    data: { section, milestones },
    isLoading: isLoadingSection,
  } = useSectionContext();
  const isLoading = isLoadingProjects || isLoadingContracts || isLoadingSection;
  const form = useForm({ defaultValues: { section } });
  const project = projectId ? projects.find((p) => p.id === projectId) : null;
  const currentAccount =
    accounts.length > 0
      ? accounts.reduce((prev, curr) =>
          curr[EAccountFields.PeriodNumber] > prev[EAccountFields.PeriodNumber]
            ? curr
            : prev,
        )
      : null;

  const projectBreadCrumbText = String(project?.title || projectId);

  const projectsTypeBreadCrumb = useProjectTypeBreadcrumb(
    projectType,
    ERoutesNames.ProjectsWithType,
  );
  const contractStageBreadcrumb = useContractStageBreadcrumb(stage);
  const title = `${
    PROJECT_DISPLAY_TEXTS.he.projectTypes[project?.projectType!]
  } / ${CONTRACTS_DISPLAY_TEXTS.he.contractPagesTitle[stage]}`;

  const projectsNavList = useProjectNavList({
    projects,
    projectId,
    projectType,
  });
  const contractsNavList = useContractsNavList({
    projectId,
    projectType,
    contracts,
    contractId: contract?.id as string,
  });
  return (
    //TODO: change to <FullPageLayout
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
          navList: contractsNavList,
        },
        contractStageBreadcrumb,
        {
          text: section?.[ESectionFields.Title] ?? '---',
          id: ERoutesNames.SectionActual,
        },
      ]}
    >
      {isLoading ? (
        <EmptyState
          animation='pulse'
          content={DISPLAY_TEXTS.he.tableStates[ETableStates.Loading]}
        />
      ) : (
        <FormProvider {...form}>
          <Card
            title={`${section?.[ESectionFields.Title]} | ${
              currentAccount?.[EAccountFields.Title] ?? '---'
            }`}
          >
            <ContractSectionFormFields
              readOnly
              workspacesOptions={prepareWorkspaceOptions(workspaces)}
            />
          </Card>
          <Card title={'הערות על סעיף'}>קישור לחשבון | כותר | תיאור</Card>
        </FormProvider>
      )}
    </PageLayout>
  );
};
