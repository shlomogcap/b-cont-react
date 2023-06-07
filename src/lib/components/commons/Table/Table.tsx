import {
  StyledTable,
  StyledTableBar,
  StyledTableCell,
  StyledTableHeader,
  StyledTableHeaders,
  StyledTableDataRow,
  StyledTableTotals,
} from './Table.styled';
import { ITableProps } from './Table.types';
import { EmptyState } from '../EmptyState';
import { DISPLAY_TEXTS, ITableStates } from '@/lib/consts/displayTexts';
import { getDisplayValue } from './Table.utils';
import { FilterPanel } from '../FilterPanel';

export const Table = <T extends string = string>({
  rows,
  totals,
  columns,
  title,
  loading,
  onRowClick,
  tableFilterProps,
}: ITableProps<T>) => {
  return (
    <StyledTable>
      {tableFilterProps && <FilterPanel {...tableFilterProps} />}
      {title && <StyledTableBar>{title}</StyledTableBar>}
      <StyledTableHeaders templateColumns={columns.map(() => '1fr').join(' ')}>
        {columns.map(({ field, display }) => (
          <StyledTableHeader key={`headers/${field}`}>
            {display ?? field}
          </StyledTableHeader>
        ))}
      </StyledTableHeaders>
      {!loading &&
        rows.map((row) => (
          <StyledTableDataRow
            onClick={() => onRowClick?.({ ...row })}
            key={row.id}
            templateColumns={columns.map(() => '1fr').join(' ')}
          >
            {columns.map(({ field, fieldPath, getValue, ...rest }) => (
              <StyledTableCell key={`${row.id}/${fieldPath ?? field}`}>
                {getDisplayValue({
                  value: getValue?.({ row, field }) ?? row?.[field],
                  ...rest,
                }) ?? ''}
              </StyledTableCell>
            ))}
          </StyledTableDataRow>
        ))}
      {!loading && rows.length === 0 && (
        <EmptyState content={DISPLAY_TEXTS.he.table[ITableStates.NoRows]} />
      )}
      {loading && <EmptyState animation='pulse' content={'Loading...'} />}
      {!loading && totals && (
        <StyledTableTotals templateColumns={columns.map(() => '1fr').join(' ')}>
          {columns.map(({ field, fieldPath, ...rest }) => (
            <StyledTableCell key={`totals/${field ?? fieldPath}`}>
              {getDisplayValue({ value: totals?.[field], ...rest }) ?? ''}
            </StyledTableCell>
          ))}
        </StyledTableTotals>
      )}
    </StyledTable>
  );
};
