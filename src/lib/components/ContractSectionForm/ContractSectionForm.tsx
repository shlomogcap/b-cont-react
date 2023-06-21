import { FirebaseError } from 'firebase/app';
import {
  IContractSectionFormProps,
  ISectionFormValues,
} from './ContractSectionForm.types';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { ISectionDoc, SectionDoc } from '@/lib/consts/sections';
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
import { FormFooter } from '../commons/Form';
import { Button } from '../commons/Button';
import { prepareFormData } from '@/lib/utils/prepareFormData';
import { StyledContractSectionForm } from './ContractSectionForm.styled';
import { prepareWorkspaceOptions } from './ContractSectionForm.utils';
import {
  SectionProvider,
  useSectionContext,
} from '@/lib/context/sectionContext';
import { MilestonesTable } from './MilestonesTable';
import { ContractSectionFormFields } from './ContractSectionFormFields';

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

  const onSubmit: SubmitHandler<ISectionFormValues> = async (data) => {
    const preparedData = prepareFormData(data);
    if (isEditMode) {
      try {
        const docRef = doc(
          firestore,
          `projects/${projectId}/contracts/${contractId}/sections/${section?.id}`,
        );
        await setDoc(docRef, preparedData, { merge: true });
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
