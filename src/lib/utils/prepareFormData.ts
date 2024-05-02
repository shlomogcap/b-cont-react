type PreparedFormData<K extends string = string> = { [key in K]: unknown };

export const prepareFormData = <T extends object>(formData: T) => {
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
