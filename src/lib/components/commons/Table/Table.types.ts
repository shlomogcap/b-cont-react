import { IWithCommonFields } from '@/lib/utils/WithFields';
import { ReactNode } from 'react';
import { IFilterPanelProps } from '../FilterPanel';
import { EToolbarButtons, EToolbarText } from '../ToolBar/ToolBar.consts';
import { IToolbarSettings } from '../ToolBar';

type IRowValues<T extends string> = {
  [field in T]?: unknown;
};
export type ITableColumnType =
  | 'string'
  | 'number'
  | 'currency'
  | 'percentage'
  | 'date'
  | 'list';

export type ITableColumnOption = {
  text: string;
  value: string;
};
export type ITableColumnOptionForNumber = Intl.NumberFormatOptions;
export type ITableColumnOptionForDate = { format?: string };

type IGetColumnValueFunctionArgs<T extends string> = {
  row: ITableRow<T>;
  field: T;
};

type ColumnOptionsMapping =
  | { type?: undefined; options?: undefined }
  | { type: 'string'; options?: ITableColumnOption }
  | { type: 'date'; options?: ITableColumnOptionForDate }
  | { type: 'number'; options?: ITableColumnOptionForNumber }
  | { type: 'currency'; options?: ITableColumnOptionForNumber }
  | { type: 'percentage'; options?: ITableColumnOptionForNumber }
  | { type: 'list'; options?: ITableColumnOption[] };

type IGetColumnValueFunction<T extends string> = (
  args: IGetColumnValueFunctionArgs<T>,
) => string | number;

export type ITableColumn<T extends string> = {
  field: T;
  fieldPath?: string;
  display?: string;
  getValue?: IGetColumnValueFunction<T>;
} & ColumnOptionsMapping;

export type IGetDisplayValueProps = {
  value: any;
} & ColumnOptionsMapping;

export type ITableRow<T extends string> = IWithCommonFields<IRowValues<T>>;

type IOnRowClickParams<T extends string> = ITableRow<T>;

export type ITableProps<T extends string = string> = {
  title?: ReactNode;
  rows: ITableRow<T>[];
  totals?: Partial<ITableRow<T>>;
  columns: ITableColumn<T>[];
  onRowClick?: (params: IOnRowClickParams<T>) => void;
  loading?: boolean;
  tableFilterProps?: IFilterPanelProps<T>;
  className?: string;
  addItem?: { text: string; handleAddItem: () => void };
  toolbar?: IToolbarSettings;
};
