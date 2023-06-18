import styled from 'styled-components';
import { StyledCard } from '../Card';

export const StyledTable = styled(StyledCard)`
  position: relative;
  display: grid;
  padding: 1.5rem 1.5rem 2.5rem;
  min-height: 30rem;
`;

type TStyledTableRowProps = {
  templateColumns?: string;
};
const StyledTableRow = styled.div<IStyledTableRowProps>`
  display: grid;
  grid-auto-flow: column dense;
  align-items: stretch;
  justify-content: start;
  grid-template-columns: ${({ templateColumns }) => templateColumns ?? 'auto'};
  position: relative;
  color: var(--color-gray-1);
  cursor: pointer;
`;

export const StyledTableCell = styled.div`
  padding: 0.5rem 0.8rem;
  font-size: var(--font-size-normal);
  line-height: 1.2em;
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;
  overflow-wrap: normal;
  color: inherit;
`;

export const StyledTableDataRow = styled(StyledTableRow)`
  border-bottom: 1px solid var(--color-gray-3);
  &:hover {
    transition: background-color 0.5s;
    background-color: var(--color-gray-trs);
  }
  & ${StyledTableCell} {
    border-left: 2px dotted var(--color-gray-3);
  }
`;

export const StyledTableBar = styled(StyledTableRow)`
  && {
    font-size: var(--font-size-large);
    font-weight: 600;
    color: var(--color-active);
  }
`;

export const StyledTableHeaders = styled(StyledTableRow)`
  border-bottom: 3px solid var(--color-gray-3);
`;
export const StyledTableTotals = styled(StyledTableRow)`
  && {
    border-top: 5px solid var(--color-active-trs);
    background-color: var(--color-bg-3);
  }
`;

export const StyledTableHeader = styled(StyledTableCell)`
  && {
    font-weight: 600;
    white-space: nowrap;
  }
`;
