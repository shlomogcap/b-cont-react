import { useState } from 'react';
import {
  StyledTable,
  StyledTableCell,
  StyledTableHeader,
  StyledTableHeaders,
  StyledTableRow,
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
      {title && <StyledTableRow>{title}</StyledTableRow>}
      <StyledTableHeaders templateColumns={templateColumns}>
        {columns.map(({ field, display }) => (
          <StyledTableHeader key={field}>{display ?? field}</StyledTableHeader>
        ))}
      </StyledTableHeaders>
      {rows.map((row) => (
        <StyledTableRow key={row.id} templateColumns={templateColumns}>
          {columns.map(({ field }) => (
            <StyledTableCell key={`${row.id}/${field}`}>
              {row.values?.[field].value ?? ''}
            </StyledTableCell>
          ))}
        </StyledTableRow>
      ))}
    </StyledTable>
  );
};
