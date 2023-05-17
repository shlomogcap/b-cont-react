import { useState } from 'react';
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

export const Table = <T extends string = string>({
  rows,
  totals,
  columns,
  title,
  onRowClick,
}: ITableProps<T>) => {
  return (
    <StyledTable>
      {title && <StyledTableBar>{title}</StyledTableBar>}
      <StyledTableHeaders templateColumns={columns.map(() => '1fr').join(' ')}>
        {columns.map(({ field, display }) => (
          <StyledTableHeader key={`headers/${field}`}>
            {display ?? field}
          </StyledTableHeader>
        ))}
      </StyledTableHeaders>
      {rows.map((row) => (
        <StyledTableDataRow
          onClick={() => onRowClick?.({ ...row })}
          key={row.id}
          templateColumns={columns.map(() => '1fr').join(' ')}
        >
          {columns.map(({ field, type }) => (
            <StyledTableCell key={`${row.id}/${field}`}>
              {getDisplayValue({ value: row?.[field], type }) ?? ''}
            </StyledTableCell>
          ))}
        </StyledTableDataRow>
      ))}
      {rows.length === 0 && (
        <EmptyState content={DISPLAY_TEXTS.he.table[ITableStates.NoRows]} />
      )}
      {totals && (
        <StyledTableTotals templateColumns={columns.map(() => '1fr').join(' ')}>
          {columns.map(({ field, type }) => (
            <StyledTableCell key={`totals/${field}`}>
              {getDisplayValue({ value: totals?.[field], type }) ?? ''}
            </StyledTableCell>
          ))}
        </StyledTableTotals>
      )}
    </StyledTable>
  );
};
