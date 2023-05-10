import { ITableColumn, ITableRow } from './Table.types';

export const rawDataToRows = <T extends string>(
  rawData: { [key in T | 'id']: unknown }[],
): ITableRow<T>[] => {
  return rawData.map(({ id, ...rest }) => ({
    id: String(id),
    values: Object.fromEntries(
      Object.entries(rest).map(([k, value]) => [k, { value }]),
    ) as ITableRow<T>['values'],
  }));
};

export const fieldsNamesToColumns = <T extends string>(
  fieldsNames: T[],
  displayTexts: Record<T, string>,
): ITableColumn<T>[] =>
  fieldsNames.map((field) => ({ field, display: displayTexts[field] }));
