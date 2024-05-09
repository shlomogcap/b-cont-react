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
import { EContractFields } from '@/lib/consts/contracts';
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
import { ActualDoc, IActualDoc } from '@/lib/consts/actuals/ActualDoc';
import {
  transformAccountsToFormShape,
  transformActualsFormValuesToAPIShape,
  transformActualsToFormShape,
} from './SectionActualPage.utils';
import { Tabs } from '../commons/Tabs';
import {
  ACTUAL_TABLE_VIEW_DISPLAY_TEXT,
  ACTUAL_TABLE_VIEW_TABS,
  EActualTableView,
  EBackToContractPageAction,
} from './SectionActualPage.consts';
import { MilestonesActualsByPeriodTable } from '../Milestones/MilestonesActualsByPeriodTable';
import { IAccountFormCell, IActualFormCell } from '../Milestones';
import { FormFooter } from '../commons/Form';
import { toast } from 'react-toastify';
import { showToastError } from '@/lib/utils/showToastError';
import { doc, writeBatch } from 'firebase/firestore';
import { firestore } from '@/lib/firebase';
import { uuid } from '@/lib/utils/uuid';
import { EActualFields } from '@/lib/consts/actuals/ActualFields';
import { EMilestoneFields } from '@/lib/consts/milestones';
import { IWithCreationFields } from '@/lib/utils/WithFields';
import { isNotNill } from '@/lib/utils/commonUtils';
import { ECommonFields } from '@/lib/consts/commonFields';
import dayjs from 'dayjs';
import { FullPageLayout } from '../PageLayout/FullPageLayout';
import { useRouter } from 'next/router';
import { useModalContext } from '@/lib/context/ModalProvider/ModalProvider';
import { EModalName } from '@/lib/context/ModalProvider/ModalName';
import axios from 'axios';

export const SectionActualPage = ({
  projectId,
  contractId,
  projectType,
  stage,
}: ISectionActualPageProps) => {
  const router = useRouter();
  const { showModal, closeModal } = useModalContext();
  const [activeView, setActiveView] = useState(EActualTableView.CumulativeView);
  const { data: projects, isLoading: isLoadingProjects } = useProjectsContext();
  const {
    data: { contracts },
    isLoading: isLoadingContracts,
  } = useProjectContractsContext();
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

  const projectsNavList = useProjectNavList({
    projects,
    projectId,
    projectType,
  });
  const contractsNavList = useContractsNavList({
    projectId,
    projectType,
    contracts,
    contractId,
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
          [EActualFields.SectionRef]: String(actualFormCell?.sectionRef),
          [EActualFields.Unit]: Number(actualFormCell?.unit),
          [EActualFields.Value]: Number(actualFormCell?.diffValue),
          [EActualFields.CurrentTotal]: Number(actualFormCell?.currentTotal),
          [EActualFields.Calc]:
            actualFormCell?.calc ?? ({} as IActualDoc['calc']),
          [ECommonFields.CreatedAt]: dayjs().toISOString(),
        };
        ActualDoc.omit({ id: true, path: true }).parse(dataToSet);
        batch.set(docRef, dataToSet, { merge: true });
      });
      await batch.commit();
      await axios.post(
        `/api/projects/${projectId}/contracts/${contractId}/sync-actuals`,
      );
      toast.success(DISPLAY_TEXTS.he.toasts[EToastType.SavingDocData]);
    } catch (err) {
      showToastError(err);
    }
  });

  return (
    <FullPageLayout
      onBackClick={() => {
        const backToContractPage = () =>
          router.push({
            pathname: ERoutesNames.Contract,
            query: {
              ...router.query,
            },
          });
        if (form.formState.isDirty) {
          showModal({
            name: EModalName.ConfirmationModal,
            content:
              ACTUAL_TABLE_VIEW_DISPLAY_TEXT.he.backToContractConfirmat.content,
            actions: [
              {
                children:
                  ACTUAL_TABLE_VIEW_DISPLAY_TEXT.he.backToContractConfirmat
                    .actions[EBackToContractPageAction.SaveAndClose],
                onClick: async () => {
                  await onSubmit();
                  closeModal();
                  backToContractPage();
                },
                variant: 'primary',
              },
              {
                children:
                  ACTUAL_TABLE_VIEW_DISPLAY_TEXT.he.backToContractConfirmat
                    .actions[EBackToContractPageAction.Cancel],
                onClick: closeModal,
                variant: 'secondary',
              },
              {
                children:
                  ACTUAL_TABLE_VIEW_DISPLAY_TEXT.he.backToContractConfirmat
                    .actions[EBackToContractPageAction.DiscardAndClose],
                variant: 'danger',
                onClick: () => {
                  backToContractPage();
                  closeModal();
                },
              },
            ],
          });
        } else {
          backToContractPage();
          closeModal();
        }
      }}
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
                onClick={async () => {
                  await onSubmit();
                  closeModal();
                }}
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
    </FullPageLayout>
  );
};
