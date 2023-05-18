import dayjs from 'dayjs';
import { IGetDisplayValueProps, ITableColumn } from './Table.types';

export const fieldsNamesToColumns = <T extends string>(
  fieldsNames: (T | ITableColumn<T>)[],
  displayTexts: Record<T, string>,
): ITableColumn<T>[] =>
  fieldsNames.map((fieldName) =>
    typeof fieldName === 'string'
      ? { field: fieldName, display: displayTexts[fieldName] }
      : {
          ...fieldName,
          field: fieldName.field,
          display: displayTexts[fieldName.field],
        },
  );
export const getDisplayValue = ({
  value,
  type,
  options,
}: IGetDisplayValueProps) => {
  switch (type) {
    case 'number':
      return Number(value).toLocaleString();
    case 'date':
      return value ? dayjs(value).format('DD/MM/YYYY') : '';
    case 'list':
      return options?.find(({ value }) => value === value)?.text ?? '';
    default:
      return value;
  }
};
