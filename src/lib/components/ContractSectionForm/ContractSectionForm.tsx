import { FirebaseError } from 'firebase/app';
import {
  IContractSectionFormFieldsProps,
  IContractSectionFormProps,
} from './ContractSectionForm.types';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
  useWatch,
} from 'react-hook-form';
import {
  ESectionFields,
  ISectionDoc,
  SECTIONS_DISPALY_TEXTS,
  SectionDoc,
} from '@/lib/consts/sections';
import { useRouter } from 'next/router';
import { queryParamToString } from '@/lib/utils/queryParamToString';
import { CONTRACT_ID_QUERY, PROJECT_ID_QUERY } from '@/lib/consts/routes';
import { useContractContext } from '@/lib/context/contractContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import {
  CONTRACT_SECTION_FORM_DEFAULT_VALUES,
  SECTION_CALULATION_METHOD_OPTIONS,
  SECTION_CALULATION_TYPE_OPTIONS,
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
import { DropdownInput, NumberInput, TextInput } from '../commons/Input';
import {
  StyledContractSectionForm,
  StyledContractSectionFormFields,
} from './ContractSectionForm.styled';
import { Divider } from '../commons/Divider';
import { EWorkspaceFields } from '@/lib/consts/workspaces';
import { useGetGroupsOptions } from './ContractSectionForm.utils';

export const ContractSectionFormFields = ({
  workspacesOptions,
  groupsOptions,
}: IContractSectionFormFieldsProps) => {
  const groupsFilterOptions = useGetGroupsOptions(groupsOptions);
  return (
    <StyledContractSectionFormFields>
      <DropdownInput
        options={workspacesOptions}
        label={
          SECTIONS_DISPALY_TEXTS.he.fields[ESectionFields.WorkspaceAreaRef]
        }
        name={ESectionFields.WorkspaceAreaRef}
      />
      <DropdownInput
        options={groupsFilterOptions}
        label={
          SECTIONS_DISPALY_TEXTS.he.fields[ESectionFields.WorkspaceGroupRef]
        }
        name={ESectionFields.WorkspaceGroupRef}
      />
      <Divider />
      <TextInput
        isRequired
        label={SECTIONS_DISPALY_TEXTS.he.fields[ESectionFields.Title]}
        name={ESectionFields.Title}
      />
      <DropdownInput
        options={SECTION_CALULATION_METHOD_OPTIONS}
        label={
          SECTIONS_DISPALY_TEXTS.he.fields[ESectionFields.CalculationMethod]
        }
        name={ESectionFields.CalculationMethod}
      />
      <DropdownInput
        options={SECTION_CALULATION_TYPE_OPTIONS}
        label={SECTIONS_DISPALY_TEXTS.he.fields[ESectionFields.CalculationType]}
        name={ESectionFields.CalculationType}
      />
      <TextInput
        label={SECTIONS_DISPALY_TEXTS.he.fields[ESectionFields.AmountType]}
        name={ESectionFields.AmountType}
      />
      <NumberInput
        label={SECTIONS_DISPALY_TEXTS.he.fields[ESectionFields.ItemsStartIndex]}
        name={ESectionFields.ItemsStartIndex}
      />
      <NumberInput
        label={SECTIONS_DISPALY_TEXTS.he.fields[ESectionFields.ItemPrice]}
        name={ESectionFields.ItemPrice}
      />
      <NumberInput
        label={SECTIONS_DISPALY_TEXTS.he.fields[ESectionFields.ItemsCount]}
        name={ESectionFields.ItemsCount}
      />
      <NumberInput
        label={SECTIONS_DISPALY_TEXTS.he.fields[ESectionFields.TotalSum]}
        name={ESectionFields.TotalSum}
      />
      <TextInput
        label={SECTIONS_DISPALY_TEXTS.he.fields[ESectionFields.Description]}
        name={ESectionFields.Description}
      />
    </StyledContractSectionFormFields>
  );
};

export const ContractSectionForm = ({
  section,
  groups,
  workspaces,
}: IContractSectionFormProps) => {
  const isEditMode = Boolean(section);
  const router = useRouter();
  const projectId = queryParamToString(router.query, PROJECT_ID_QUERY);
  const contractId = queryParamToString(router.query, CONTRACT_ID_QUERY);
  const form = useForm<ISectionDoc>({
    resolver: zodResolver(SectionDoc),
    defaultValues: CONTRACT_SECTION_FORM_DEFAULT_VALUES,
    mode: 'onSubmit',
  });
  const { reset } = form;

  useEffect(() => {
    if (isEditMode) {
      if (section) {
        reset(section);
      }
    }
  }, [isEditMode, reset, section]);

  const onSubmit: SubmitHandler<ISectionDoc> = async (data) => {
    const preparedData = prepareFormData(data);
    if (isEditMode) {
      try {
        const docRef = doc(
          firestore,
          `projects/${projectId}/contracts/${contractId}/sections/${section?.id}`,
        );
        await setDoc(docRef, preparedData, { merge: true });
        toast.success(DISPLAY_TEXTS.he.toasts[IToastType.SavingDocData]);
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
      // router.push({
      //   pathname: IRoutesNames.Project,
      //   query: { [PROJECT_ID_QUERY]: res.id },
      // });
    } catch (err) {
      //TODO: promt error...
      console.error(err);
    }
  };
  const onError: SubmitErrorHandler<ISectionDoc> = (errors) => {
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
          workspacesOptions={workspaces.map((workspace) => ({
            text: workspace[EWorkspaceFields.Title],
            value: JSON.stringify(workspace),
          }))}
          groupsOptions={groups.map((group) => ({
            text: group[EWorkspaceFields.Title],
            value: JSON.stringify(group),
          }))}
        />
        <FormFooter>
          {form.formState.isDirty && (
            <>
              <Button onClick={form.handleSubmit(onSubmit, onError)}>
                {DISPLAY_TEXTS.he.buttons[IButtonTexts.Save]}
              </Button>
              <Button variant='secondary' onClick={abortChanges}>
                {DISPLAY_TEXTS.he.buttons[IButtonTexts.Cancel]}
              </Button>
            </>
          )}
        </FormFooter>
      </StyledContractSectionForm>
    </FormProvider>
  );
};
