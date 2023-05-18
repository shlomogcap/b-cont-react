import { PROJECT_DISPLAY_TEXTS, ProjectFields } from '@/lib/consts/projects';
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormFooter } from '../commons/Form';
import {
  DateInput,
  DropdownInput,
  NumberInput,
  TextInput,
} from '../commons/Input';
import { Button } from '../commons/Button';
import { DISPLAY_TEXTS, IButtonTexts } from '@/lib/consts/displayTexts';
import {
  DUMMY_OPTIONS,
  PROJECT_FORM_DEFAULT_VALUES,
  projectFormSchema,
} from './ProjectForm.consts';
import { ProjectFormValues } from './ProjectForm.types';
import { useCalcPeriods } from './hooks/useCalcPeriods';
import { useCalcEDateByPeriodsAndSDate } from './hooks/useCalcEDateByPeriodsAndSDate';

const ProjectFormFields = () => {
  const calcPeriods = useCalcPeriods();
  const calcEDateByPeriodsAndSDate = useCalcEDateByPeriodsAndSDate();
  return (
    <>
      <TextInput
        isRequired
        label={PROJECT_DISPLAY_TEXTS.he.fields[ProjectFields.Title]}
        name={ProjectFields.Title}
      />
      <TextInput
        label={PROJECT_DISPLAY_TEXTS.he.fields[ProjectFields.Address]}
        name={ProjectFields.Address}
      />
      <DateInput
        label={PROJECT_DISPLAY_TEXTS.he.fields[ProjectFields.SDate]}
        name={ProjectFields.SDate}
        afterChange={() => calcPeriods()}
      />
      <NumberInput
        label={PROJECT_DISPLAY_TEXTS.he.fields[ProjectFields.NumberOfPeriods]}
        name={ProjectFields.NumberOfPeriods}
        afterChange={() => calcEDateByPeriodsAndSDate()}
      />
      <DateInput
        label={PROJECT_DISPLAY_TEXTS.he.fields[ProjectFields.EDate]}
        name={ProjectFields.EDate}
        afterChange={() => calcPeriods()}
      />
      <TextInput
        label={PROJECT_DISPLAY_TEXTS.he.fields[ProjectFields.Description]}
        name={ProjectFields.Description}
      />
      <DropdownInput
        options={DUMMY_OPTIONS}
        label={PROJECT_DISPLAY_TEXTS.he.fields[ProjectFields.Manager]}
        name={ProjectFields.Manager}
      />
      <DropdownInput
        options={DUMMY_OPTIONS}
        label={PROJECT_DISPLAY_TEXTS.he.fields[ProjectFields.SeniorManager]}
        name={ProjectFields.SeniorManager}
      />
      <NumberInput
        label={PROJECT_DISPLAY_TEXTS.he.fields[ProjectFields.NumberOfBuildings]}
        name={ProjectFields.NumberOfBuildings}
      />
      <NumberInput
        label={
          PROJECT_DISPLAY_TEXTS.he.fields[ProjectFields.NumberOfApatrments]
        }
        name={ProjectFields.NumberOfApatrments}
      />
      <DropdownInput
        options={DUMMY_OPTIONS}
        label={PROJECT_DISPLAY_TEXTS.he.fields[ProjectFields.Executor]}
        name={ProjectFields.Executor}
      />
      <DropdownInput
        options={DUMMY_OPTIONS}
        label={PROJECT_DISPLAY_TEXTS.he.fields[ProjectFields.Entrepreneur]}
        name={ProjectFields.Entrepreneur}
      />
      <DropdownInput
        options={DUMMY_OPTIONS}
        label={PROJECT_DISPLAY_TEXTS.he.fields[ProjectFields.ProjectType]}
        name={ProjectFields.ProjectType}
      />
      <DropdownInput
        options={DUMMY_OPTIONS}
        label={PROJECT_DISPLAY_TEXTS.he.fields[ProjectFields.Status]}
        name={ProjectFields.Status}
      />
    </>
  );
};

export const ProjectForm = () => {
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: PROJECT_FORM_DEFAULT_VALUES,
    mode: 'onSubmit',
  });

  const onSubmit = (data: ProjectFormValues) => {
    console.log(data);
  };
  const onError = (error: any) => {
    console.log('ERROR:', error);
  };
  const abortChanges = () => {
    console.log('TODO: abort all changes');
    form.reset(PROJECT_FORM_DEFAULT_VALUES);
  };

  return (
    <FormProvider {...form}>
      <Form>
        <ProjectFormFields />
        {form.formState.isDirty && (
          <FormFooter>
            <Button onClick={form.handleSubmit(onSubmit, onError)}>
              {DISPLAY_TEXTS.he.buttons[IButtonTexts.Save]}
            </Button>
            <Button variant='secondary' onClick={abortChanges}>
              {DISPLAY_TEXTS.he.buttons[IButtonTexts.Cancel]}
            </Button>
          </FormFooter>
        )}
      </Form>
    </FormProvider>
  );
};