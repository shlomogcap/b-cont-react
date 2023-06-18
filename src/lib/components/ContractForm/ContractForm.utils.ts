import { IContractDoc } from '@/lib/consts/contracts';

type TPreparedFormData = { [key: string]: unknown };

export const prepareFormData = (formData: IContractDoc) => {
  return Object.entries(formData).reduce(
    (acc: PreparedFormData, [key, value]) => {
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
