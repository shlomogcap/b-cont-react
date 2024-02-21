import {
  PROJECT_DISPLAY_TEXTS,
  ProjectDoc,
  EProjectFields,
} from '@/lib/consts/projects';
import React, { useEffect } from 'react';
import {
  useForm,
  FormProvider,
  SubmitHandler,
  SubmitErrorHandler,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormFooter } from '../commons/Form';
import {
  DateInput,
  DropdownInput,
  NumberInput,
  TextInput,
} from '../commons/Input';
import { Button } from '../commons/Button';
import {
  DISPLAY_TEXTS,
  EButtonTexts,
  EToastType,
} from '@/lib/consts/displayTexts';
import {
  DUMMY_OPTIONS,
  PROJECT_FORM_DEFAULT_VALUES,
  PROJECT_STATUS_OPTIONS,
  PROJECT_TYPE_OPTIONS,
} from './ProjectForm.consts';
import { IProjectFormProps, IProjectFormValues } from './ProjectForm.types';
import { useCalcPeriods } from './hooks/useCalcPeriods';
import { useCalcEDateByPeriodsAndSDate } from './hooks/useCalcEDateByPeriodsAndSDate';
import { useProjectsContext } from '@/lib/context/projectsContext';
import { firestore } from '@firebase';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import {
  PROJECT_ID_QUERY,
  ERoutesNames,
  PROJECT_TYPE_QUERY,
} from '@/lib/consts/routes';
import { toast } from 'react-toastify';
import { prepareFormData } from '@/lib/utils/prepareFormData';

const ProjectFormFields = () => {
  const calcPeriods = useCalcPeriods();
  const calcEDateByPeriodsAndSDate = useCalcEDateByPeriodsAndSDate();
  return (
    <>
      <TextInput
        isRequired
        label={PROJECT_DISPLAY_TEXTS.he.fields[EProjectFields.Title]}
        name={EProjectFields.Title}
      />
      <TextInput
        label={PROJECT_DISPLAY_TEXTS.he.fields[EProjectFields.Address]}
        name={EProjectFields.Address}
      />
      <DateInput
        label={PROJECT_DISPLAY_TEXTS.he.fields[EProjectFields.SDate]}
        name={EProjectFields.SDate}
        afterChange={() => calcPeriods()}
      />
      <NumberInput
        label={PROJECT_DISPLAY_TEXTS.he.fields[EProjectFields.NumberOfPeriods]}
        name={EProjectFields.NumberOfPeriods}
        afterChange={() => calcEDateByPeriodsAndSDate()}
      />
      <DateInput
        label={PROJECT_DISPLAY_TEXTS.he.fields[EProjectFields.EDate]}
        name={EProjectFields.EDate}
        afterChange={() => calcPeriods()}
      />
      <TextInput
        label={PROJECT_DISPLAY_TEXTS.he.fields[EProjectFields.Description]}
        name={EProjectFields.Description}
      />
      <DropdownInput
        options={DUMMY_OPTIONS}
        label={PROJECT_DISPLAY_TEXTS.he.fields[EProjectFields.Manager]}
        name={EProjectFields.Manager}
      />
      <DropdownInput
        options={DUMMY_OPTIONS}
        label={PROJECT_DISPLAY_TEXTS.he.fields[EProjectFields.SeniorManager]}
        name={EProjectFields.SeniorManager}
      />
      <NumberInput
        label={
          PROJECT_DISPLAY_TEXTS.he.fields[EProjectFields.NumberOfBuildings]
        }
        name={EProjectFields.NumberOfBuildings}
      />
      <NumberInput
        label={
          PROJECT_DISPLAY_TEXTS.he.fields[EProjectFields.NumberOfApatrments]
        }
        name={EProjectFields.NumberOfApatrments}
      />
      <DropdownInput
        options={DUMMY_OPTIONS}
        label={PROJECT_DISPLAY_TEXTS.he.fields[EProjectFields.Executor]}
        name={EProjectFields.Executor}
      />
      <DropdownInput
        options={DUMMY_OPTIONS}
        label={PROJECT_DISPLAY_TEXTS.he.fields[EProjectFields.Entrepreneur]}
        name={EProjectFields.Entrepreneur}
      />
      <DropdownInput
        options={PROJECT_TYPE_OPTIONS}
        label={PROJECT_DISPLAY_TEXTS.he.fields[EProjectFields.ProjectType]}
        name={EProjectFields.ProjectType}
      />
      <DropdownInput
        options={PROJECT_STATUS_OPTIONS}
        label={PROJECT_DISPLAY_TEXTS.he.fields[EProjectFields.Status]}
        name={EProjectFields.Status}
      />
    </>
  );
};

export const ProjectForm = ({ id }: IProjectFormProps) => {
  const isEditMode = Boolean(id);
  const router = useRouter();
  const { data: projects, isLoading } = useProjectsContext();
  const form = useForm<IProjectFormValues>({
    resolver: zodResolver(ProjectDoc),
    defaultValues: PROJECT_FORM_DEFAULT_VALUES,
    mode: 'onSubmit',
  });
  const { reset, watch } = form;
  useEffect(() => {
    if (isEditMode && !isLoading) {
      const project = projects.find((project) => project.id === id);
      if (project !== undefined) {
        reset(project);
      }
    }
  }, [isLoading, isEditMode, reset, id, projects]);

  const onSubmit: SubmitHandler<IProjectFormValues> = async (data) => {
    const preparedData = prepareFormData(data);
    if (isEditMode) {
      try {
        const docRef = doc(firestore, `projects/${id}`);
        await setDoc(docRef, preparedData, { merge: true });
        toast.success(DISPLAY_TEXTS.he.toasts[EToastType.SavingDocData]);
      } catch (err) {
        //TODO: promt error...
        console.error(err);
      }
      return;
    }
    try {
      const collectionRef = collection(firestore, 'projects');
      const res = await addDoc(collectionRef, preparedData);
      toast.success(DISPLAY_TEXTS.he.toasts[EToastType.AddingNewDoc]);
      router.push({
        pathname: ERoutesNames.Project,
        query: {
          [PROJECT_ID_QUERY]: res.id,
          [PROJECT_TYPE_QUERY]: watch(EProjectFields.ProjectType),
        },
      });
    } catch (err) {
      //TODO: promt error...
      console.error(err);
    }
  };
  const onError: SubmitErrorHandler<IProjectFormValues> = (errors) => {
    //TODO: promt error...
    console.log('ERROR:', errors);
  };
  const abortChanges = () => {
    form.reset(PROJECT_FORM_DEFAULT_VALUES);
  };

  return (
    <FormProvider {...form}>
      <Form>
        <ProjectFormFields />
        {form.formState.isDirty && (
          <FormFooter>
            <Button onClick={form.handleSubmit(onSubmit, onError)}>
              {DISPLAY_TEXTS.he.buttons[EButtonTexts.Save]}
            </Button>
            <Button variant='secondary' onClick={abortChanges}>
              {DISPLAY_TEXTS.he.buttons[EButtonTexts.Cancel]}
            </Button>
          </FormFooter>
        )}
      </Form>
    </FormProvider>
  );
};
