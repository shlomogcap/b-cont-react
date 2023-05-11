import styled from 'styled-components';

export const StyledCard = styled.div`
  background-color: var(--color-white);
  border-radius: 1.8rem;
  min-height: 10rem;
  width: 100%;
  padding: 3rem;
  display: grid;
  align-content: flex-start;
  position: relative;
`;

export const StyledCardTitle = styled.div`
  grid-column: 1 / -1;
  font-size: var(--font-size-large);
  font-weight: 500;
  color: var(--color-active-1);
`;
