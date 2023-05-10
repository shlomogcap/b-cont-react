import { useState } from 'react';
import {
  StyledTable,
  StyledTableBar,
  StyledTableCell,
  StyledTableHeader,
  StyledTableHeaders,
  StyledTableDataRow,
} from './Table.styled';
import { ITableProps } from './Table.types';

export const Table = <T extends string = string>({
  rows,
  columns,
  title,
}: ITableProps<T>) => {
  const [templateColumns, setTemplateColumns] = useState(() =>
    columns.map(() => '1fr').join(' '),
  );
  return (
    <StyledTable>
      {title && <StyledTableBar>{title}</StyledTableBar>}
      <StyledTableHeaders templateColumns={templateColumns}>
        {columns.map(({ field, display }) => (
          <StyledTableHeader key={field}>{display ?? field}</StyledTableHeader>
        ))}
      </StyledTableHeaders>
      {rows.map((row) => (
        <StyledTableDataRow key={row.id} templateColumns={templateColumns}>
          {columns.map(({ field }) => (
            <StyledTableCell key={`${row.id}/${field}`}>
              {row.values?.[field].value ?? ''}
            </StyledTableCell>
          ))}
        </StyledTableDataRow>
      ))}
    </StyledTable>
  );
};
