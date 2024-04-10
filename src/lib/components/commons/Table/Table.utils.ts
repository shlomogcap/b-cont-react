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
      return isFinite(value)
        ? Number(value).toLocaleString(undefined, options)
        : '';
    case 'currency':
      return isFinite(value)
        ? Number(value).toLocaleString(undefined, {
            style: 'currency',
            currency: 'ILS',
            currencyDisplay: 'symbol',
            maximumFractionDigits: 0,
            ...(options ?? {}),
          })
        : '';
    case 'percentage':
      return isFinite(value)
        ? Number(value).toLocaleString(navigator.languages, {
            style: 'percent',
            ...(options ?? {}),
          })
        : '';
    case 'date':
      return value ? dayjs(value).format(options?.format ?? 'DD/MM/YYYY') : '';
    case 'list':
      return options?.find(({ value }) => value === value)?.text ?? '';
    default:
      return value;
  }
};
