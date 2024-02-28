import {
  EWorkspaceFields,
  IWorkspaceDoc,
  WORKSPACES_DISPALY_TEXTS,
  WorkspaceDoc,
} from '@/lib/consts/workspaces';
import { DropdownInput, TextInput } from '../commons/Input';
import {
  StyledContractAddWorkspaceForm,
  StyledContractAddWorkspaceFormFields,
} from './ContractAddWorkspaceForm.styled';
import {
  IContractAddWorkspaceFormFieldsProps,
  IContractAddWorkspaceFormProps,
} from './ContractAddWorkspaceForm.types';
import { Divider } from '../commons/Divider';
import { FormFooter } from '../commons/Form';
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { prepareFormData } from '@/lib/utils/prepareFormData';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { firestore } from '@/lib/firebase';
import {
  DISPLAY_TEXTS,
  EButtonTexts,
  EToastType,
} from '../../consts/displayTexts';
import { toast } from 'react-toastify';
import { FirebaseError } from 'firebase/app';
import { useRouter } from 'next/router';
import { queryParamToString } from '@/lib/utils/queryParamToString';
import { CONTRACT_ID_QUERY, PROJECT_ID_QUERY } from '@/lib/consts/routes';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Button } from '../commons/Button';
import { CONTRACT_WORKSPACE_FORM_DEFAULT_VALUES } from './ContractAddWorkspaceForm.consts';
import { showToastError } from '@/lib/utils/showToastError';

const ContractAddWorkspaceFormFields = ({
  workspacesOptions,
}: IContractAddWorkspaceFormFieldsProps) => {
  return (
    <StyledContractAddWorkspaceFormFields>
      <DropdownInput
        options={workspacesOptions}
        label={WORKSPACES_DISPALY_TEXTS.he.fields[EWorkspaceFields.Parent]}
        name={EWorkspaceFields.Parent}
      />
      <Divider />
      <TextInput
        isRequired
        label={WORKSPACES_DISPALY_TEXTS.he.fields[EWorkspaceFields.Title]}
        name={EWorkspaceFields.Title}
      />
      <TextInput
        label={WORKSPACES_DISPALY_TEXTS.he.fields[EWorkspaceFields.Description]}
        name={EWorkspaceFields.Description}
      />
      <DropdownInput
        options={
          [] /**TODO: prepare options from props - all instruemnt related with this project could be an option */
        }
        label={
          WORKSPACES_DISPALY_TEXTS.he.fields[EWorkspaceFields.InstrumentRef]
        }
        name={EWorkspaceFields.InstrumentRef}
      />
    </StyledContractAddWorkspaceFormFields>
  );
};

export const ContractAddWorkspaceForm = ({
  workspace,
  onSaved,
  workspaces,
}: IContractAddWorkspaceFormProps) => {
  const isEditMode = Boolean(workspace);
  const router = useRouter();
  const projectId = queryParamToString(router.query, PROJECT_ID_QUERY);
  const contractId = queryParamToString(router.query, CONTRACT_ID_QUERY);
  const form = useForm<IWorkspaceDoc>({
    resolver: zodResolver(WorkspaceDoc),
    defaultValues: CONTRACT_WORKSPACE_FORM_DEFAULT_VALUES,
    mode: 'onSubmit',
  });
  const { reset } = form;

  useEffect(() => {
    if (isEditMode) {
      if (workspace) {
        reset(workspace);
      }
    }
  }, [isEditMode, reset, workspace]);

  const onSubmit: SubmitHandler<IWorkspaceDoc> = async (data) => {
    const preparedData = prepareFormData(data);
    if (isEditMode) {
      try {
        const docRef = doc(
          firestore,
          `projects/${projectId}/contracts/${contractId}/workspaces/${workspace?.id}`,
        );
        await setDoc(docRef, preparedData, { merge: true });
        toast.success(DISPLAY_TEXTS.he.toasts[EToastType.SavingDocData]);
        onSaved?.(workspace);
      } catch (err) {
        showToastError(err);
      }
      return;
    }
    try {
      const collectionRef = collection(
        firestore,
        `projects/${projectId}/contracts/${contractId}/workspaces`,
      );
      const res = await addDoc(collectionRef, preparedData);
      onSaved?.({ ...(workspace ?? {}), id: res.id, path: res.path });
      toast.success(DISPLAY_TEXTS.he.toasts[EToastType.AddingNewDoc]);
      // router.push({
      //   pathname: IRoutesNames.Project,
      //   query: { [PROJECT_ID_QUERY]: res.id },
      // });
    } catch (err) {
      //TODO: promt error...
      console.error(err);
    }
  };
  const onError: SubmitErrorHandler<IWorkspaceDoc> = (errors) => {
    //TODO: promt error...
    console.log('ERROR:', errors);
  };
  const abortChanges = () => {
    if (isEditMode) {
    } else {
      form.reset(CONTRACT_WORKSPACE_FORM_DEFAULT_VALUES);
    }
  };
  return (
    <FormProvider {...form}>
      <StyledContractAddWorkspaceForm>
        <ContractAddWorkspaceFormFields
          workspacesOptions={workspaces
            .filter((ws) => !ws.parent)
            .map((ws) => ({ text: ws.title, value: ws.path! }))}
        />
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
      </StyledContractAddWorkspaceForm>
    </FormProvider>
  );
};
