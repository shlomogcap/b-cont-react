import {
  StyledTable,
  StyledTableBar,
  StyledTableCell,
  StyledTableHeader,
  StyledTableHeaders,
  StyledTableDataRow,
  StyledTableTotals,
} from './Table.styled';
import { ITableColumn, ITableProps, ITableRow } from './Table.types';
import { EmptyState } from '../EmptyState';
import { DISPLAY_TEXTS, ETableStates } from '@/lib/consts/displayTexts';
import { getDisplayValue } from './Table.utils';
import { FilterPanel } from '../FilterPanel';
import { Badge } from '../Badge';
import { AddItem } from '../../AddItem';
import { ToolBar } from '../ToolBar';
import { Tooltip } from '../Tooltip';

type ITableCellProps<T extends string = string> = {
  column: ITableColumn<T>;
  row: ITableRow<T>;
};

const TableCell = <T extends string = string>({
  column,
  row,
}: ITableCellProps<T>) => {
  const { field, getValue, getTooltipContent, ...rest } = column;
  const displayText =
    getDisplayValue({
      value: getValue?.({ row, field }) ?? row?.[field],
      ...rest,
    }) ?? '';
  return (
    <Tooltip content={getTooltipContent?.({ row, field }) ?? displayText}>
      <StyledTableCell>{displayText}</StyledTableCell>
    </Tooltip>
  );
};

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
          <Tooltip
            key={`headers/${fieldPath ?? field}`}
            content={display ?? field}
          >
            <StyledTableHeader>
              {tableFilterProps?.activeFilters[field] && <Badge columnBadge />}
              {display ?? field}
            </StyledTableHeader>
          </Tooltip>
        ))}
      </StyledTableHeaders>
      {!loading &&
        rows.map((row) => (
          <StyledTableDataRow
            onClick={() => onRowClick?.({ ...row })}
            key={row.id}
            templateColumns={columns.map(() => '1fr').join(' ')}
          >
            {columns.map((column) => (
              <TableCell
                key={`${row.id}/${column.fieldPath ?? column.field}`}
                column={column}
                row={row}
              />
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
