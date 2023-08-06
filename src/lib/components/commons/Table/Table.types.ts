import { IWithCommonFields } from '@/lib/utils/WithFields';
import { ReactNode } from 'react';
import { IFilterPanelProps } from '../FilterPanel';
import { EToolbarButtons, EToolbarText } from '../ToolBar/ToolBar.consts';

type IRowValues<T extends string> = {
  [field in T]?: unknown;
};
export type ITableColumnType =
  | 'string'
  | 'number'
  | 'percentage'
  | 'date'
  | 'list';

export type ITableColumnOption = {
  text: string;
  value: string;
};

type IGetColumnValueFunctionArgs<T extends string> = {
  row: ITableRow<T>;
  field: T;
};

type IGetColumnValueFunction<T extends string> = (
  args: IGetColumnValueFunctionArgs<T>,
) => string | number;

export type ITableColumn<T extends string> = {
  field: T;
  fieldPath?: string;
  display?: string;
  type?: ITableColumnType;
  options?: ITableColumnOption[];
  getValue?: IGetColumnValueFunction<T>;
};

export type IGetDisplayValueProps = {
  value: any;
  type?: ITableColumnType;
  options?: ITableColumnOption[];
};

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
  addItem?: { text: string; func: () => void } | undefined;
  toolbar?:
    | {
        buttons: EToolbarButtons[];
        display: Record<EToolbarText, string | ((arg0: string) => string)>;
        type: EToolbarText;
      }
    | undefined;
};
