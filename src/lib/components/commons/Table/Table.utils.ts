import { ITableColumn } from './Table.types';

export const fieldsNamesToColumns = <T extends string>(
  fieldsNames: T[],
  displayTexts: Record<T, string>,
): ITableColumn<T>[] =>
  fieldsNames.map((field) => ({ field, display: displayTexts[field] }));
