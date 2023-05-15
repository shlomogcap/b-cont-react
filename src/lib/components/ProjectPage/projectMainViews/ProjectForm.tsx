import { PROJECT_DISPLAY_TEXTS, ProjectFields } from '@/lib/consts/projects';
import React from 'react';
import { useForm, Resolver, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { InputControl } from '../../commons/Input/Input';
import { validationTexts } from '@/lib/consts/validationTexts';

const projectFormSchema = z.object({
  [ProjectFields.Title]: z
    .string({ required_error: validationTexts.REQUIRED })
    .nonempty(validationTexts.REQUIRED),
  [ProjectFields.Address]: z.string().optional(),
});

type ContactFormValues = z.infer<typeof projectFormSchema>;

export const ProjectForm = () => {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(projectFormSchema),
    mode: 'onSubmit',
  });

  const onSubmit = (data: ContactFormValues) => {
    console.log(data);
  };
  const onError = (error: any) => {
    console.log('ERROR:', error);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onError)}>
        <InputControl
          label={PROJECT_DISPLAY_TEXTS.he.fields[ProjectFields.Title]}
          name={ProjectFields.Title}
        />
        <InputControl
          label={PROJECT_DISPLAY_TEXTS.he.fields[ProjectFields.Address]}
          name={ProjectFields.Address}
        />
        <button type='submit'>Submit</button>
      </form>
    </FormProvider>
  );
};
