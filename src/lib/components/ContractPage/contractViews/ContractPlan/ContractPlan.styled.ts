import { StyledButton } from '@/lib/components/commons/Button/Button.styled';
import styled from 'styled-components';

export const StyledContractPlan = styled.div``;

export const StyledActionsRow = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-content: flex-end;
  grid-column-gap: 0.2rem;
  padding-block-end: 0.5rem;
  height: 5rem;
  & ${StyledButton} {
    height: 100%;
  }
`;
