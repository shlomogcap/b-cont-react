import styled from 'styled-components';
import { Form, FormFooter } from '../commons/Form';
import { StyledTableCell } from '../commons/Table/Table.styled';
import { StyledInputField } from '../commons/Input/Input.styled';
import { StyledSvgIcon } from '../icons/SvgIcon/SvgIcon.styled';

export const StyledContractSectionForm = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  align-content: space-between;
  grid-row-gap: 4rem;
`;

export const StyledCellCircelButton = styled.div`
  z-index: 10;
  visibility: hidden;
  opacity: 0;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 50%;
  transform: translateY(-50%);
  left: 5px;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background-color: var(--color-gray-trs);
  cursor: pointer;
  transition: all 0.2s ease-in;
  &:hover {
    background-color: var(--color-white);
    & ${StyledSvgIcon} {
      transform: scale(1.1);
    }
  }
`;

export const StyledContractSectionFormFields = styled(Form)`
  width: 100%;
  align-content: flex-start;
`;

export const StyledMilestonesTable = styled.div`
  display: grid;
  overflow-y: scroll;
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
  &:hover ${StyledCellCircelButton} {
    visibility: visible;
    opacity: 1;
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

export const StyledActionsFooter = styled(FormFooter)`
  margin-top: 2rem;
  grid-column: 1/-1;
  display: grid;
  gap: 0;
  justify-content: stretch;
`;
export const StyledAction = styled.div`
  background-color: var(--color-gray-trs);
  font-size: 1.6rem;
  font-weight: 500;
  display: grid;
  align-items: center;
  justify-content: center;
  justify-items: center;
  padding: 1rem;
  color: var(--color-active);
  cursor: pointer;
  transition: all 0.2s ease-in;
  &:not(:last-child) {
    border-left: 1px solid var(--color-bg-1);
  }
  &:hover {
    background-color: var(--color-bg-1);
  }
  & ${StyledSvgIcon} {
    fill: var(--color-active);
  }
`;
