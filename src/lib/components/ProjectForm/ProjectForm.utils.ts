import { IProjectFormValues } from './ProjectForm.types';

type IPreparedFormData = { [key: string]: unknown };

export const prepareFormData = (formData: IProjectFormValues) => {
  return Object.entries(formData).reduce(
    (acc: IPreparedFormData, [key, value]) => {
      if (value instanceof Date) {
        acc[key] = value.toISOString();
      } else if (value !== undefined) {
        acc[key] = value;
      }
      return acc;
    },
    {},
  );
};
