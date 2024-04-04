import { useProjectsContext } from '@/lib/context/projectsContext';
import { ISectionActualPageProps } from './SectionActualPage.types';
import { useContractContext } from '@/lib/context/contractContext';
import { useProjectTypeBreadcrumb } from '../ProjectPage/useProjectTypeBreadcrumb';
import { useContractStageBreadcrumb } from '../ProjectPage/useContractStageBreadcrumb';
import { useProjectNavList } from '@/lib/hooks/useProjectNavList';
import { EmptyState } from '../commons/EmptyState';
import {
  DISPLAY_TEXTS,
  EButtonTexts,
  ETableStates,
  EToastType,
} from '@/lib/consts/displayTexts';
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
import {
  ESectionCalculationMethod,
  ESectionFields,
  ISectionDoc,
} from '@/lib/consts/sections';
import { EAccountFields } from '@/lib/consts/accounts/AccountFields';
import { useEffect, useState } from 'react';
import { MilestonesActualsTable } from '../Milestones/MilestonesActualsTable';
import { Button } from '../commons/Button';
import { IActualDoc } from '@/lib/consts/actuals/ActualDoc';
import {
  transformAccountsToFormShape,
  transformActualsFormValuesToAPIShape,
  transformActualsToFormShape,
} from './SectionActualPage.utils';
import { Tabs } from '../commons/Tabs';
import {
  ACTUAL_TABLE_VIEW_TABS,
  EActualTableView,
} from './SectionActualPage.consts';
import { MilestonesActualsByPeriodTable } from '../Milestones/MilestonesActualsByPeriodTable';
import { IAccountFormCell, IActualFormCell } from '../Milestones';
import { FormFooter } from '../commons/Form';
import { toast } from 'react-toastify';
import { showToastError } from '@/lib/utils/showToastError';
import {
  DocumentReference,
  collection,
  doc,
  writeBatch,
} from 'firebase/firestore';
import { firestore } from '@/lib/firebase';
import { uuid } from '@/lib/utils/uuid';
import { EActualFields } from '@/lib/consts/actuals/ActualFields';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { EMilestoneFields, MilestoneDoc } from '@/lib/consts/milestones';
import { IWithCreationFields } from '@/lib/utils/WithFields';
import { isNotNill } from '@/lib/utils/commonUtils';
import { ECommonFields } from '@/lib/consts/commonFields';
import dayjs from 'dayjs';

export const SectionActualPage = ({
  projectId,
  projectType,
  stage,
}: ISectionActualPageProps) => {
  const [activeView, setActiveView] = useState(EActualTableView.CumulativeView);
  const { data: projects, isLoading: isLoadingProjects } = useProjectsContext();
  const { data: contracts, isLoading: isLoadingContracts } =
    useProjectContractsContext();
  const {
    data: { contract, workspaces, accounts, actuals },
  } = useContractContext();
  const {
    data: { section, milestones },
    isLoading: isLoadingSection,
  } = useSectionContext();
  const isLoading = isLoadingProjects || isLoadingContracts || isLoadingSection;
  const form = useForm({
    defaultValues: {
      section,
      milestones,
      actuals: [[{} as IActualFormCell]],
      accounts: [[{} as IAccountFormCell]],
    },
  });
  const { reset, handleSubmit } = form;
  const project = projectId ? projects.find((p) => p.id === projectId) : null;
  const currentAccount =
    accounts.length > 0
      ? accounts.reduce((prev, curr) =>
          curr[EAccountFields.PeriodNumber] > prev[EAccountFields.PeriodNumber]
            ? curr
            : prev,
        )
      : null;
  const currentAccountPeriod = Number(
    currentAccount?.[EAccountFields.PeriodNumber],
  );
  const isPaushcal =
    section?.[ESectionFields.CalculationMethod] ===
    ESectionCalculationMethod.Pauschal;

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
  useEffect(() => {
    reset({
      section,
      milestones,
      actuals: transformActualsToFormShape({
        section: section as ISectionDoc,
        milestones,
        actuals,
        currentAccountPeriod,
      }),
      accounts: transformAccountsToFormShape({
        accounts,
        currentAccountPeriod,
        section: section as ISectionDoc,
        milestones,
        actuals,
      }),
    });
  }, [reset, section, milestones, currentAccountPeriod, accounts, actuals]);

  const onSubmit = handleSubmit(async (formValues) => {
    const preparedActuals = transformActualsFormValuesToAPIShape({
      formValues,
      actuals,
      currentAccountPeriod,
    });
    try {
      const batch = writeBatch(firestore);
      preparedActuals.forEach((actualFormCell) => {
        const docRef = doc(firestore, `${contract?.path}/actuals/${uuid()}`);
        const milestoneDoc = milestones.find(
          (ms) => ms.path === actualFormCell?.sectionRef,
        );
        const actualDocTitle = [
          section?.[ESectionFields.Title],
          milestoneDoc?.[EMilestoneFields.Title],
          currentAccount?.[EAccountFields.Period],
          actualFormCell?.unit,
        ]
          .filter(isNotNill)
          .join(' / ');
        const dataToSet: IWithCreationFields<IActualDoc> = {
          [EActualFields.Title]: actualDocTitle,
          [EActualFields.PeriodNumber]: currentAccountPeriod,
          [EActualFields.SectionRef]: actualFormCell?.sectionRef,
          [EActualFields.Unit]: Number(actualFormCell?.unit),
          [EActualFields.Value]: Number(actualFormCell?.diffValue),
          [EActualFields.CurrentTotal]: Number(actualFormCell?.currentTotal),
          [EActualFields.Calc]: actualFormCell?.calc!,
          [ECommonFields.CreatedAt]: dayjs().toISOString(),
        };
        console.log(dataToSet);
        batch.set(docRef, dataToSet, { merge: true });
      });
      await batch.commit();
      toast.success(DISPLAY_TEXTS.he.toasts[EToastType.SavingDocData]);
    } catch (err) {
      showToastError(err);
    }
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
              fieldsNames={Object.values(ESectionFields).reduce(
                (acc, field) => ({ ...acc, [field]: `section.${field}` }),
                {} as Record<ESectionFields, string>,
              )}
            />
          </Card>
          <Card title={'הערות על סעיף'}>קישור לחשבון | כותר | תיאור</Card>
          <Card title={'טבלת ביצוע'}>
            {!isPaushcal && (
              <>
                <Tabs
                  activeTab={activeView}
                  setActiveTab={setActiveView}
                  tabs={ACTUAL_TABLE_VIEW_TABS}
                />
                <div style={{ marginTop: '2rem' }} />
              </>
            )}
            {activeView === EActualTableView.CumulativeView && (
              <MilestonesActualsTable isLoading={isLoading} />
            )}
            {activeView === EActualTableView.PeriodView && (
              <MilestonesActualsByPeriodTable
                isLoading={isLoading}
                accounts={accounts}
              />
            )}
            <FormFooter>
              <Button
                onClick={onSubmit}
                disabled={
                  form.formState.isSubmitting || !form.formState.isDirty
                }
              >
                {DISPLAY_TEXTS.he.buttons[EButtonTexts.Save]}
              </Button>
            </FormFooter>
          </Card>
        </FormProvider>
      )}
    </PageLayout>
  );
};