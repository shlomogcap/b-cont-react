import { ReactNode } from 'react';

export type ITableColumn<T extends string> = {
  field: T;
  display?: string;
  type?: 'string' | 'number' | 'percentage' | 'date';
};
export type ITableRow<T extends string> = {
  id: string;
  values: {
    [field in T]: {
      value: string | number;
    };
  };
};

type IOnRowClickParams = {
  id: string;
};

export type ITableProps<T extends string = string> = {
  title?: ReactNode;
  rows: ITableRow<T>[];
  columns: ITableColumn<T>[];
  onRowClick?: (params: IOnRowClickParams) => void;
};
