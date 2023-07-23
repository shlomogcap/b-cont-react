import dayjs from 'dayjs';
import { IGetDisplayValueProps, ITableColumn } from './Table.types';

export const fieldsNamesToColumns = <T extends string>(
  fieldsNames: (T | ITableColumn<T>)[],
  displayTexts: Record<T, string>,
): ITableColumn<T>[] =>
  fieldsNames.map((fieldName) =>
    typeof fieldName === 'string'
      ? { field: fieldName as T, display: String(displayTexts[fieldName]) }
      : {
          ...fieldName,
          field: fieldName.field as T,
          display: String(displayTexts[fieldName.field]),
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
    case 'percentage':
      return Number(value).toLocaleString(navigator.languages, {
        style: 'percent',
      });
    case 'date':
      return value ? dayjs(value).format('DD/MM/YYYY') : '';
    case 'list':
      return options?.find(({ value }) => value === value)?.text ?? '';
    default:
      return value;
  }
};
