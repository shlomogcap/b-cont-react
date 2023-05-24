import { ReactNode } from 'react';

type IRowValues<T extends string> = {
  [field in T]?: unknown;
};
export type ITableColumnType =
  | 'string'
  | 'number'
  | 'percentage'
  | 'date'
  | 'list';

export type ITableColumnOption = { text: string; value: string };

export type ITableColumn<T extends string> = {
  field: T;
  display?: string;
  type?: ITableColumnType;
  options?: ITableColumnOption[];
};

export type IGetDisplayValueProps = {
  value: any;
  type?: ITableColumnType;
  options?: ITableColumnOption[];
};

export type ITableRow<T extends string> = {
  id: string;
} & IRowValues<T>;

type IOnRowClickParams<T extends string> = ITableRow<T>;

export type ITableProps<T extends string = string> = {
  title?: ReactNode;
  rows: ITableRow<T>[];
  totals?: Omit<ITableRow<T>, 'id'>;
  columns: ITableColumn<T>[];
  onRowClick?: (params: IOnRowClickParams<T>) => void;
  loading?: boolean;
};
