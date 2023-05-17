import styled from 'styled-components';
import { IEmptyStateProps } from './EmptyState.types';

export const StyledEmptyState = styled.div`
  padding-block: 3rem;
  width: 100%;
  display: grid;
  row-gap: 0.8rem;
  align-items: center;
  justify-content: center;
  align-content: center;
  justify-items: center;
  font-size: var(--font-size-normal);
  color: var(--color-non-active);
`;
export const StyledEmptyStateRow = styled.div<{
  animation: IEmptyStateProps['animation'];
}>`
  width: 100%;
  height: 4.5rem;
  min-width: 20rem;
  background-color: var(--color-gray-trs);
  border-radius: 4px;
  animation: ${({ animation }) => animation} 2s infinite;
  @keyframes pulse {
    0% {
      opacity: 0.4;
    }
    30% {
      opacity: 0.8;
    }
    50% {
      opacity: 0.7;
    }
    100% {
      opacity: 0.3;
    }
  }
`;
