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
import { DISPLAY_TEXTS, ETableStates } from '@/lib/consts/displayTexts';
import { getDisplayValue } from './Table.utils';
import { FilterPanel } from '../FilterPanel';
import { Badge } from '../Badge';
import { AddItem } from '../../AddItem';
import { ToolBar } from '../ToolBar';

export const Table = <T extends string = string>({
  rows,
  totals,
  columns,
  title,
  loading,
  className,
  onRowClick,
  tableFilterProps,
  addItem,
  toolbar,
}: ITableProps<T>) => {
  return (
    <StyledTable className={className}>
      {addItem && <AddItem addItem={addItem} />}
      {tableFilterProps && <FilterPanel {...tableFilterProps} />}
      {title && <StyledTableBar>{title}</StyledTableBar>}
      <StyledTableHeaders templateColumns={columns.map(() => '1fr').join(' ')}>
        {columns.map(({ field, display, fieldPath }) => (
          <StyledTableHeader key={`headers/${fieldPath ?? field}`}>
            {tableFilterProps?.activeFilters[field] && <Badge columnBadge />}
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
            {toolbar && row.path && (
              <ToolBar path={row.path} toolbar={toolbar} title={row?.title} />
            )}
          </StyledTableDataRow>
        ))}
      {!loading && rows.length === 0 && (
        <EmptyState
          content={DISPLAY_TEXTS.he.tableStates[ETableStates.NoRows]}
        />
      )}
      {loading && (
        <EmptyState
          animation='pulse'
          content={DISPLAY_TEXTS.he.tableStates[ETableStates.Loading]}
        />
      )}
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
