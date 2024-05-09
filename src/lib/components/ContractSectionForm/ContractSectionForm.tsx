import {
  IContractSectionFormProps,
  IHandleSwapOrderIndexFunc,
  ISectionFormValues,
} from './ContractSectionForm.types';
import {
  addDoc,
  collection,
  doc,
  writeBatch,
  deleteDoc,
  CollectionReference,
} from 'firebase/firestore';
import { toast } from 'react-toastify';
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { useRouter } from 'next/router';
import { queryParamToString } from '@/lib/utils/queryParamToString';
import { CONTRACT_ID_QUERY, PROJECT_ID_QUERY } from '@/lib/consts/routes';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import {
  CONTRACT_SECTION_FORM_DEFAULT_VALUES,
  EMPTY_MILESONE_DEFAULT_VALUES,
  SectionFormShape,
} from './ContractSectionForm.consts';
import {
  DISPLAY_TEXTS,
  EButtonTexts,
  EToastType,
} from '@/lib/consts/displayTexts';
import { firestore } from '@/lib/firebase';
import { prepareFormData } from '@/lib/utils/prepareFormData';
import {
  StyledAction,
  StyledActionsFooter,
  StyledContractSectionForm,
} from './ContractSectionForm.styled';
import { prepareWorkspaceOptions } from './ContractSectionForm.utils';
import {
  SectionProvider,
  useSectionContext,
} from '@/lib/context/sectionContext';
import { ContractSectionFormFields } from './ContractSectionFormFields';
import { CopyIcon, DeleteIcon, PlusIcon, PreviewIcon } from '../icons';
import { Button } from '../commons/Button';
import { FormFooter } from '../commons/Form';
import {
  EConfirmSectionActions,
  ESectionActions,
  ESectionFields,
  SECTIONS_DISPALY_TEXTS,
} from '@/lib/consts/sections';
import { uuid } from '@/lib/utils/uuid';
import {
  EMilestoneFields,
  IMilestoneDoc,
  MILESTONES_DISPALY_TEXTS,
  MilestoneDoc,
} from '@/lib/consts/milestones';
import { getNextIndex } from '@/lib/utils/arrayUtils';
import { WithConfirmAction } from '../commons/WithConfirmAction';
import { toNumber } from '@/lib/utils/numberUtils';
import { useToggle } from '@/lib/hooks/useToggle';
import { IWithCreationFields } from '@/lib/utils/WithFields';
import dayjs from 'dayjs';
import { ECommonFields } from '@/lib/consts/commonFields';
import { z } from 'zod';
import { getEnumMemberOrSelf } from '@/lib/utils/enumUtils';
import { showToastError } from '@/lib/utils/showToastError';
import { MilestonesPlanTable } from '../Milestones';

export const ContractSectionForm = (props: IContractSectionFormProps) => (
  <SectionProvider sectionPath={props.section?.path}>
    <ContractSectionFormInner {...props} />
  </SectionProvider>
);

const ContractSectionFormInner = ({
  section,
  workspaces,
  onSaved,
}: IContractSectionFormProps) => {
  const {
    isLoading,
    data: { milestones },
  } = useSectionContext();

  const isEditMode = Boolean(section);
  const [isPreviewMode, togglePreviewMode] = useToggle(false);
  const router = useRouter();
  const projectId = queryParamToString(router.query, PROJECT_ID_QUERY);
  const contractId = queryParamToString(router.query, CONTRACT_ID_QUERY);
  const form = useForm<ISectionFormValues>({
    resolver: zodResolver(SectionFormShape),
    defaultValues: CONTRACT_SECTION_FORM_DEFAULT_VALUES,
    mode: 'onSubmit',
  });
  const { reset, watch, setValue } = form;
  useEffect(() => {
    if (isEditMode) {
      if (section) {
        reset({ ...section, milestones });
      }
    }
  }, [isEditMode, reset, section, milestones]);

  const onSubmit: SubmitHandler<ISectionFormValues> = async ({
    milestones: milestonesData,
    ...sectionData
  }) => {
    const preparedData = prepareFormData(sectionData);
    if (isEditMode) {
      try {
        const batch = writeBatch(firestore);
        const sectionPath = `projects/${projectId}/contracts/${contractId}/sections/${section?.id}`;
        const docRef = doc(firestore, sectionPath);
        batch.set(docRef, preparedData, { merge: true });
        milestonesData.forEach((ms) => {
          const msRef = doc(firestore, `${sectionPath}/milestones/${ms.id}`);
          batch.set(msRef, prepareFormData(ms), { merge: true });
        });
        await batch.commit();
        toast.success(DISPLAY_TEXTS.he.toasts[EToastType.SavingDocData]);
        onSaved?.();
      } catch (err) {
        showToastError(err);
      }
      return;
    }
    try {
      const collectionRef = collection(
        firestore,
        `projects/${projectId}/contracts/${contractId}/sections`,
      );
      const res = await addDoc(collectionRef, preparedData);
      toast.success(DISPLAY_TEXTS.he.toasts[EToastType.AddingNewDoc]);
      onSaved?.({ id: res.id, path: res.path, ...preparedData });
      // router.push({
      //   pathname: IRoutesNames.Project,
      //   query: { [PROJECT_ID_QUERY]: res.id },
      // });
    } catch (err) {
      //TODO: promt error...
      console.error(err);
    }
  };
  const onError: SubmitErrorHandler<ISectionFormValues> = (errors) => {
    //TODO: promt error...
    console.log('ERROR:', errors);
  };
  const abortChanges = () => {
    if (isEditMode) {
    } else {
      form.reset(CONTRACT_SECTION_FORM_DEFAULT_VALUES);
    }
  };
  const handleDeleteSection = async () => {
    const sectionPath = `projects/${projectId}/contracts/${contractId}/sections/${section?.id}`;
    const docRef = doc(firestore, sectionPath);
    await deleteDoc(docRef);
    onSaved?.();
  };
  const handleDeleteMilestone = async (id: string) => {
    const milestonePath = `projects/${projectId}/contracts/${contractId}/sections/${section?.id}/milestones/${id}`;
    const docRef = doc(firestore, milestonePath);
    try {
      await deleteDoc(docRef);
      toast.success(DISPLAY_TEXTS.he.toasts[EToastType.DeletedDoc]);
    } catch (err) {
      console.error(err);
      toast.error(JSON.stringify(err));
    }
  };
  const handleSwapMilestonesOrderIndex: IHandleSwapOrderIndexFunc = async ({
    originalDoc,
    otherDoc,
  }) => {
    const milestonesPath = `projects/${projectId}/contracts/${contractId}/sections/${section?.id}/milestones`;
    const batch = writeBatch(firestore);
    const originalDocRef = doc(
      firestore,
      `${milestonesPath}/${originalDoc.id}`,
    );
    const otherDocRef = doc(firestore, `${milestonesPath}/${otherDoc.id}`);
    batch.set(
      originalDocRef,
      { [EMilestoneFields.OrderIndex]: otherDoc.orderIndex },
      { merge: true },
    );
    batch.set(
      otherDocRef,
      { [EMilestoneFields.OrderIndex]: originalDoc.orderIndex },
      { merge: true },
    );
    try {
      await batch.commit();
      toast.success(DISPLAY_TEXTS.he.toasts[EToastType.SavingDocData]);
    } catch (err) {
      toast.error(JSON.stringify(err));
    }
  };
  const handleAddUnit = () => {
    const oldUnit = toNumber(watch(ESectionFields.ItemsCount) ?? 0);
    setValue(ESectionFields.ItemsCount, oldUnit + 1);
  };
  const handleCreateMilestone = async () => {
    const contractSectionsPath = `projects/${projectId}/contracts/${contractId}/sections/${section?.id}`;
    const milestonesRef = collection(
      firestore,
      `${contractSectionsPath}/milestones`,
    );
    const milestoneData = {
      ...EMPTY_MILESONE_DEFAULT_VALUES,
      [ECommonFields.CreatedAt]: dayjs().toISOString(),
      [EMilestoneFields.OrderIndex]: getNextIndex(
        milestones,
        EMilestoneFields.OrderIndex,
      ),
    };
    try {
      MilestoneDoc.omit({ id: true, path: true }).parse(milestoneData);
      await addDoc<IWithCreationFields<IMilestoneDoc>>(
        milestonesRef as CollectionReference<IMilestoneDoc>,
        milestoneData as IMilestoneDoc,
      );
      toast.success(DISPLAY_TEXTS.he.toasts[EToastType.AddingNewDoc]);
    } catch (err) {
      const errorMessages: string[] = [];
      if (err instanceof z.ZodError) {
        Object.entries(err.formErrors.fieldErrors).forEach(
          ([field, errors]) => {
            const fieldDisplayText = getEnumMemberOrSelf(
              field,
              MILESTONES_DISPALY_TEXTS.he.fields,
            );
            errorMessages?.push(
              `${fieldDisplayText} : ${errors?.join(' , ')}\n`,
            );
          },
        );
      }
      toast.error(
        errorMessages.length > 0 ? (
          <ul>
            {errorMessages.map((text) => (
              <li key={text}>{text}</li>
            ))}
          </ul>
        ) : (
          'An Error Occured'
        ),
      );
    }
  };
  const handleDuplicateSection = async () => {
    const contractSectionsPath = `projects/${projectId}/contracts/${contractId}/sections`;
    const newSectionId = uuid();
    const sectionsRef = doc(
      firestore,
      `${contractSectionsPath}/${newSectionId}`,
    );
    const batch = writeBatch(firestore);
    batch.set(
      sectionsRef,
      prepareFormData(
        {
          ...section,
          title: `${section?.title} [copy of ${section?.title}]`,
          donePercentage: 0,
          totalActualsSum: 0,
        } ?? {},
      ),
    );
    milestones.forEach((ms) => {
      const msRef = doc(
        firestore,
        `${contractSectionsPath}/${newSectionId}/milestones/${ms.id}`,
      );
      batch.set(msRef, prepareFormData({ ...ms, totalDone: 0 }));
    });
    try {
      await batch.commit();
      onSaved?.({ ...section, id: newSectionId });
    } catch (err) {
      toast.error(
        `An Error Occured , Copy Section Task Was Failed : ${JSON.stringify(
          err,
        )}`,
      );
    }
  };
  return (
    <FormProvider {...form}>
      <StyledContractSectionForm>
        <ContractSectionFormFields
          workspacesOptions={prepareWorkspaceOptions(workspaces)}
        />
        {isEditMode && milestones.length > 0 && (
          <MilestonesPlanTable
            handleSwapMilestonesOrderIndex={handleSwapMilestonesOrderIndex}
            handleDeleteMilestone={handleDeleteMilestone}
            isLoading={isLoading}
            isPreviewMode={isPreviewMode}
          />
        )}
        <StyledActionsFooter>
          <WithConfirmAction
            onConfirm={handleDeleteSection}
            confirmText={
              SECTIONS_DISPALY_TEXTS.he.confirmActions[
                EConfirmSectionActions.DeleteSection
              ]
            }
          >
            <StyledAction>
              <span>{DISPLAY_TEXTS.he.buttons[EButtonTexts.Delete]}</span>
              <DeleteIcon />
            </StyledAction>
          </WithConfirmAction>
          <StyledAction onClick={handleDuplicateSection}>
            <span>{DISPLAY_TEXTS.he.buttons[EButtonTexts.Duplicate]}</span>
            <CopyIcon />
          </StyledAction>
          {milestones.length > 0 && (
            <StyledAction onClick={handleCreateMilestone}>
              <span>
                {
                  SECTIONS_DISPALY_TEXTS.he.actions[
                    ESectionActions.AddMilestone
                  ]
                }
              </span>
              <PlusIcon />
            </StyledAction>
          )}
          <StyledAction onClick={handleAddUnit}>
            <span>
              {SECTIONS_DISPALY_TEXTS.he.actions[ESectionActions.AddUnit]}
            </span>
            <PlusIcon />
          </StyledAction>
          {milestones.length > 0 && (
            <StyledAction onClick={togglePreviewMode}>
              <span>
                {SECTIONS_DISPALY_TEXTS.he.actions[ESectionActions.ShowPreview]}
              </span>
              <PreviewIcon mode={isPreviewMode ? 'hide' : 'show'} />
            </StyledAction>
          )}
          {milestones.length === 0 && isEditMode && (
            <StyledAction onClick={handleCreateMilestone}>
              <span>
                {
                  SECTIONS_DISPALY_TEXTS.he.actions[
                    ESectionActions.CreateMilestones
                  ]
                }
              </span>
              <PlusIcon />
            </StyledAction>
          )}
        </StyledActionsFooter>
        <FormFooter>
          <Button
            onClick={form.handleSubmit(onSubmit, onError)}
            disabled={!form.formState.isDirty}
          >
            {DISPLAY_TEXTS.he.buttons[EButtonTexts.Save]}
          </Button>
          <Button
            variant='secondary'
            onClick={abortChanges}
            disabled={!form.formState.isDirty}
          >
            {DISPLAY_TEXTS.he.buttons[EButtonTexts.Cancel]}
          </Button>
        </FormFooter>
      </StyledContractSectionForm>
    </FormProvider>
  );
};
// m(".section__action", { onclick: e => handleDeleteSection(e, section) }, "מחק", m(Icon, { icon: "icon-delete" })),
// (sectionIndex > 0) && m(".section__action", { onclick: e => moveSectionIndex(section, sectionsArr[sectionIndex - 1].docData.ref) }, "למעלה", m(Icon, { icon: "icon-arrow-up" })),
// (sectionIndex < sectionsArr.length - 1) && m(".section__action", { onclick: e => moveSectionIndex(section, sectionsArr[sectionIndex + 1].docData.ref) }, "למטה", m(Icon, { icon: "icon-arrow-down" })),
