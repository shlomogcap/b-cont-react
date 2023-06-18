import { WithCommonFields } from '@/lib/utils/WithFields';
import { ReactNode } from 'react';
import { IFilterPanelProps } from '../FilterPanel';

type TRowValues<T extends string> = {
  [field in T]?: unknown;
};
export type TTableColumnType =
  | 'string'
  | 'number'
  | 'percentage'
  | 'date'
  | 'list';

export type TTableColumnOption = {
  text: string;
  value: string;
};

type TGetColumnValueFunctionArgs<T extends string> = {
  row: ITableRow<T>;
  field: T;
};

type TGetColumnValueFunction<T extends string> = (
  args: IGetColumnValueFunctionArgs<T>,
) => string | number;

export type TTableColumn<T extends string> = {
  field: T;
  fieldPath?: string;
  display?: string;
  type?: ITableColumnType;
  options?: ITableColumnOption[];
  getValue?: IGetColumnValueFunction<T>;
};

export type TGetDisplayValueProps = {
  value: any;
  type?: ITableColumnType;
  options?: ITableColumnOption[];
};

export type TTableRow<T extends string> = WithCommonFields<IRowValues<T>>;

type TOnRowClickParams<T extends string> = ITableRow<T>;

export type TTableProps<T extends string = string> = {
  title?: ReactNode;
  rows: ITableRow<T>[];
  totals?: Partial<ITableRow<T>>;
  columns: ITableColumn<T>[];
  onRowClick?: (params: IOnRowClickParams<T>) => void;
  loading?: boolean;
  tableFilterProps?: IFilterPanelProps<T>;
  className?: string;
};
