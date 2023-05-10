import styled from 'styled-components';

//TODO: move to its own file
export const StyledCard = styled.div`
  background-color: var(--color-white);
  border-radius: 1.8rem;
  min-height: 20rem;
  width: 100%;
  padding: 3rem;
  display: grid;
  gap: 1rem;
  align-content: flex-start;
  position: relative;
`;

export const StyledTable = styled(StyledCard)`
  position: relative;
  display: grid;
  padding: 1.5rem 1.5rem 2.5rem;
`;

type IStyledTableRowProps = {
  templateColumns?: string;
};
export const StyledTableRow = styled.div<IStyledTableRowProps>`
  display: grid;
  grid-auto-flow: column dense;
  grid-column-gap: 1rem;
  align-items: start;
  justify-content: start;
  grid-template-columns: ${({ templateColumns }) => templateColumns ?? 'auto'};
  position: relative;
  color: var(--color-gray-1);
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

export const StyledTableCell = styled.div`
  padding: 0.5rem;
  font-size: var(--font-size-normal);
  overflow: visible;
  text-overflow: ellipsis;
  position: relative;
  overflow-wrap: normal;
  color: inherit;
`;
export const StyledTableHeader = styled(StyledTableCell)`
  && {
    font-size: var(--font-size-large);
    font-weight: 500;
  }
`;
