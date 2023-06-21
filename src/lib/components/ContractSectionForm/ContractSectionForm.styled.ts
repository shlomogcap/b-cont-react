import styled from 'styled-components';
import { Form } from '../commons/Form';
import { StyledTableCell } from '../commons/Table/Table.styled';
import { StyledInputField } from '../commons/Input/Input.styled';

export const StyledContractSectionForm = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  align-content: space-between;
  grid-row-gap: 4rem;
`;

export const StyledContractSectionFormFields = styled(Form)`
  width: 100%;
  align-content: flex-start;
`;

export const StyledMilestonesTable = styled.div`
  display: grid;
`;
export const StyledCell = styled(StyledTableCell)`
  white-space: nowrap;
  border: 1px solid var(--color-bg-2);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  font-size: 1.8rem;
  overflow: visible;
  & ${StyledInputField} {
    background-color: unset;
  }
`;

export const StyledHeader = styled(StyledCell)`
  background-color: #c4d79b;
`;
export const StyledValue = styled(StyledCell)`
  align-items: flex-end;
  background-color: #ff9;
`;
export const StyledTotal = styled(StyledCell)`
  background-color: #6495ed;
  color: white;
  direction: ltr;
`;
export const StyledGrandTotal = styled(StyledCell)`
  background-color: var(--color-active);
  color: #fff;
  font-weight: 500;
  direction: ltr;
`;
export const StyledIndex = styled(StyledCell)`
  background-color: white;
`;
