import styled from 'styled-components';
import { EditIcon } from '../icons/EditIcon';

export const StyledContractPage = styled.div``;

export const StyledContratCardTitle = styled.div`
  display: grid;
  grid-template-columns: 1fr max-content;
`;
export const StyledEditContractIcon = styled(EditIcon)`
  cursor: pointer;
  transition: all 0.2s ease-in;
  &:hover {
    color: var(--color-active);
    transform: scale(1.2);
  }
  &:active {
    color: var(--color-active-light);
    transform: scale(0.9);
  }
`;

export const StyledContractPageRow = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 1rem;
`;
