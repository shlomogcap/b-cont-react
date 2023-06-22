import { FirebaseError } from 'firebase/app';
import {
  IContractSectionFormProps,
  ISectionFormValues,
} from './ContractSectionForm.types';
import { addDoc, collection, doc, writeBatch } from 'firebase/firestore';
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
  SectionFormShape,
} from './ContractSectionForm.consts';
import {
  DISPLAY_TEXTS,
  IButtonTexts,
  IToastType,
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
import { MilestonesTable } from './MilestonesTable';
import { ContractSectionFormFields } from './ContractSectionFormFields';
import { CopyIcon, DeleteIcon, PlusIcon, PreviewIcon } from '../icons';
import { Button } from '../commons/Button';
import { Divider } from '../commons/Divider';
import { FormFooter } from '../commons/Form';
import { CONTRACTS_DISPLAY_TEXTS } from '@/lib/consts/contracts';
import { ESectionActions, SECTIONS_DISPALY_TEXTS } from '@/lib/consts/sections';

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
  const router = useRouter();
  const projectId = queryParamToString(router.query, PROJECT_ID_QUERY);
  const contractId = queryParamToString(router.query, CONTRACT_ID_QUERY);
  const form = useForm<ISectionFormValues>({
    resolver: zodResolver(SectionFormShape),
    defaultValues: CONTRACT_SECTION_FORM_DEFAULT_VALUES,
    mode: 'onSubmit',
  });
  const { reset } = form;
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
        toast.success(DISPLAY_TEXTS.he.toasts[IToastType.SavingDocData]);
        onSaved?.();
      } catch (err) {
        toast.error(
          err instanceof FirebaseError
            ? err.message
            : JSON.stringify(err ?? { error: 'Unexpected Error' }),
        );
        console.error(err);
      }
      return;
    }
    try {
      const collectionRef = collection(
        firestore,
        `projects/${projectId}/contracts/${contractId}/sections`,
      );
      const res = await addDoc(collectionRef, preparedData);
      toast.success(DISPLAY_TEXTS.he.toasts[IToastType.AddingNewDoc]);
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
  return (
    <FormProvider {...form}>
      <StyledContractSectionForm>
        <ContractSectionFormFields
          workspacesOptions={prepareWorkspaceOptions(workspaces)}
        />
        {isEditMode && milestones.length > 0 && (
          <MilestonesTable milestones={milestones} isLoading={isLoading} />
        )}
        <StyledActionsFooter>
          <StyledAction>
            <span>{DISPLAY_TEXTS.he.buttons[IButtonTexts.Delete]}</span>
            <DeleteIcon />
          </StyledAction>
          <StyledAction>
            <span>{DISPLAY_TEXTS.he.buttons[IButtonTexts.Duplicate]}</span>
            <CopyIcon />
          </StyledAction>
          <StyledAction>
            <span>
              {SECTIONS_DISPALY_TEXTS.he.actions[ESectionActions.AddMilestone]}
            </span>
            <PlusIcon />
          </StyledAction>
          <StyledAction>
            <span>
              {SECTIONS_DISPALY_TEXTS.he.actions[ESectionActions.AddUnit]}
            </span>
            <PlusIcon />
          </StyledAction>
          <StyledAction>
            <span>
              {SECTIONS_DISPALY_TEXTS.he.actions[ESectionActions.ShowPreview]}
            </span>
            <PreviewIcon mode='show' />
          </StyledAction>
        </StyledActionsFooter>
        <FormFooter>
          <Button
            onClick={form.handleSubmit(onSubmit, onError)}
            disabled={!form.formState.isDirty}
          >
            {DISPLAY_TEXTS.he.buttons[IButtonTexts.Save]}
          </Button>
          <Button
            variant='secondary'
            onClick={abortChanges}
            disabled={!form.formState.isDirty}
          >
            {DISPLAY_TEXTS.he.buttons[IButtonTexts.Cancel]}
          </Button>
        </FormFooter>
      </StyledContractSectionForm>
    </FormProvider>
  );
};
// m(".section__action", { onclick: e => handleDeleteSection(e, section) }, "מחק", m(Icon, { icon: "icon-delete" })),
// m(".section__action", { onclick: e => handleCopySection(e, section, milestones) }, "שכפל", m(Icon, { icon: "icon-copy" })),
// (!section.isNew) && [
//     // (sectionIndex > 0) && m(".section__action", { onclick: e => moveSectionIndex(section, sectionsArr[sectionIndex - 1].docData.ref) }, "למעלה", m(Icon, { icon: "icon-arrow-up" })),
//     // (sectionIndex < sectionsArr.length - 1) && m(".section__action", { onclick: e => moveSectionIndex(section, sectionsArr[sectionIndex + 1].docData.ref) }, "למטה", m(Icon, { icon: "icon-arrow-down" })),
//     m(".section__action", { onclick: e => addMilestone(`${section.docData.ref}/milestones`) }, "הוסף אבן דרך", m(Icon, { icon: "icon-plus" })),
//     m(".section__action", { onclick: e => addUnit(section) }, "הוסף יחידה", m(Icon, { icon: "icon-plus" })),
//     m(".section__action", { onclick: e => vnode.attrs.togglePreviewEdit(section.docData.docID) }, "תצוגה מקדימה", m(Icon, { icon: "icon-eye" })),
// ]
