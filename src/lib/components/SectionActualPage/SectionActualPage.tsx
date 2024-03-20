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
  SectionDoc,
} from '@/lib/consts/sections';
import { EAccountFields } from '@/lib/consts/accounts/AccountFields';
import { useEffect, useState } from 'react';
import { MilestonesActulasTable } from '../Milestones/MilestonesActualsTable';
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
import { MilestonesActulasByPeriodTable } from '../Milestones/MilestonesActualsByPeriodTable';
import { IAccountFormCell, IActualFormCell } from '../Milestones';
import { FormFooter } from '../commons/Form';
import { toast } from 'react-toastify';
import { showToastError } from '@/lib/utils/showToastError';
import { DocumentReference, doc, writeBatch } from 'firebase/firestore';
import { firestore } from '@/lib/firebase';
import { uuid } from '@/lib/utils/uuid';
import { EActualFields } from '@/lib/consts/actuals/ActualFields';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MilestoneDoc } from '@/lib/consts/milestones';

const actualsMock: IActualDoc[] = [
  {
    id: '1',
    calc: {
      _itemPrice: 100,
      _weight: 0.5,
      _price: 50,
      _actualsValue: 0.8,
    },
    value: 80,
    currentTotal: 40, // 100 * 0.8 * 0.8
    path: 'projects/1/contracts/1/accounts/1',
    sectionRef: 'projects/1/contracts/1/sections/1/milestones/1',
    unit: 1,
    title: '01 2024 / milestone 1 / unit 1',
    periodNumber: 1,
  },
  {
    id: '2',
    calc: {
      _itemPrice: 100,
      _weight: 0.25,
      _price: 25,
      _actualsValue: 0.4,
    },
    value: 40,
    currentTotal: 10, // 100 * 0.25 * 0.4
    path: 'projects/1/contracts/1/accounts/1',
    sectionRef: 'projects/1/contracts/1/sections/1/milestones/3',
    unit: 1,
    title: '01 2024 / milestone 3 / unit 1',
    periodNumber: 1,
  },
];

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
        actuals: actualsMock,
        currentAccountPeriod,
      }),
      accounts: transformAccountsToFormShape({
        accounts,
        currentAccountPeriod,
        section: section as ISectionDoc,
        milestones,
        actuals: actualsMock,
      }),
    });
  }, [reset, section, milestones, currentAccountPeriod, accounts]);

  const onSubmit = handleSubmit(async (formValues) => {
    const preparedActuals = transformActualsFormValuesToAPIShape({
      formValues,
      actuals: actualsMock,
      currentAccountPeriod,
    });
    try {
      //TODO: batch request to save form values
      // const batch = writeBatch(firestore);
      preparedActuals.forEach((actual) => {
        // [2] think if actuals are under account/{id}/actuals or under contracts/{id}/actuals
        // const actualDocId = actual?.id || uuid();
        // const docRef = doc(
        //   firestore,
        //   `${currentAccount?.path}/actulas/${actualDocId}`,
        // );
        // const dataToSet: IActualDoc = {
        //   [EActualFields.Value]: Number(actual?.diffValue),
        //   [EActualFields.PeriodNumber]: currentAccountPeriod,
        // };
        // batch.set(docRef, dataToSet, { merge: true });
      });
      // await batch.commit();
    } catch (err) {
      showToastError(err);
    }
    console.log(preparedActuals);
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
              <MilestonesActulasTable isLoading={isLoading} />
            )}
            {activeView === EActualTableView.PeriodView && (
              <MilestonesActulasByPeriodTable
                isLoading={isLoading}
                accounts={accounts}
              />
            )}
            <FormFooter>
              <Button onClick={onSubmit}>
                {DISPLAY_TEXTS.he.buttons[EButtonTexts.Save]}
              </Button>
            </FormFooter>
          </Card>
        </FormProvider>
      )}
    </PageLayout>
  );
};
