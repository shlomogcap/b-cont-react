import styled from 'styled-components';
import { Modal } from '../Modal';
import { StyledButton } from '../Button';

export const StyledConfirmationModal = styled(Modal)``;

export const StyledConfirmationModalActions = styled.div`
  display: grid;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  grid-auto-flow: column;
  & ${StyledButton} {
    min-width: 7rem;
    height: 5rem;
    white-space: nowrap;
    width: fit-content;
    max-width: none;
  }
`;
