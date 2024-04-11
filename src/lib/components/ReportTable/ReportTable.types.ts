import { ReactNode } from 'react';
import { ITableProps, ITableRow } from '../commons/Table';

export type ISectionLevel = 'main' | 'secondary' | 'tertiary';

export type IReportTableSection<T extends string> =
  | {
      title: ReactNode;
      totals?: Partial<ITableRow<T>>;
      level?: ISectionLevel;
      sections: IReportTableSection<T>[];
      rows?: undefined;
      onTotalsClick?: (row: Partial<ITableRow<T>>) => void;
    }
  | {
      title: ReactNode;
      totals?: Partial<ITableRow<T>>;
      level?: ISectionLevel;
      rows: ITableRow<T>[];
      sections?: undefined;
      onTotalsClick?: (row: Partial<ITableRow<T>>) => void;
    };

type ExtendedTableProps<T extends string> = Omit<
  ITableProps<T>,
  'rows' | 'totals'
>;

export type IReportTableProps<T extends string = string> =
  ExtendedTableProps<T> & {
    sections: IReportTableSection<T>[];
    onSectionClick?: (section: Partial<IReportTableSection<T>>) => void;
    onTotalsClick?: (totalsRow: Partial<ITableRow<T>>) => void;
  };

export type IReportSectionProps<T extends string = string> = Pick<
  IReportTableProps<T>,
  'columns' | 'loading' | 'onRowClick' | 'onSectionClick' | 'onTotalsClick'
> & {
  section: IReportTableSection<T>;
  depth: number;
};
