import { ReactNode } from 'react';
import { ITableProps, ITableRow } from '../commons/Table';

export type TSectionLevel = 'main' | 'secondary' | 'tertiary';

export type TReportTableSection<T extends string> =
  | {
      title: ReactNode;
      totals?: Partial<ITableRow<T>>;
      level?: ISectionLevel;
      sections: IReportTableSection<T>[];
      rows?: undefined;
    }
  | {
      title: ReactNode;
      totals?: Partial<ITableRow<T>>;
      level?: ISectionLevel;
      rows: ITableRow<T>[];
      sections?: undefined;
    };

type ExtendedTableProps<T extends string> = Omit<
  ITableProps<T>,
  'rows' | 'totals'
>;

export type TReportTableProps<T extends string = string> =
  ExtendedTableProps<T> & {
    sections: IReportTableSection<T>[];
  };

export type TReportSectionProps<T extends string = string> = Pick<
  IReportTableProps<T>,
  'columns' | 'loading' | 'onRowClick'
> & {
  section: IReportTableSection<T>;
  depth: number;
};
