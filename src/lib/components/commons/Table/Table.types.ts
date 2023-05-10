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

export type ITableProps<T extends string = string> = {
  title: string;
  rows: ITableRow<T>[];
  columns: ITableColumn<T>[];
};
