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
  font-size: 2.5rem;
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
`;
export const StyledTableHeaders = styled(StyledTableRow)`
  border-bottom: 3px solid var(--color-gray-3);
`;
export const StyledTableCell = styled.div``;
export const StyledTableHeader = styled(StyledTableCell)`
  font-size: 2.2rem;
  font-weight: 500;
`;
