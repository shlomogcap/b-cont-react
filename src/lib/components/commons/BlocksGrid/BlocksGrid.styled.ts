import styled from 'styled-components';

export const StyledBlockElement = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  font-size: 2rem;
  font-weight: 500;
  background-color: white;
  padding: 2rem;
  border-radius: 2rem;
  box-shadow: var(--box-shadow-light);
  min-width: 20rem;
  min-height: 20rem;
  cursor: pointer;
  color: var(--color-active);
  grid-auto-rows: auto;
  /* @include activateButton();TODO: */
  transition: all 0.2s ease-in-out;
  .icon {
    fill: var(--color-active);
    width: 5rem;
    height: 5rem;
  }
`;

export const StyledBlocksGrid = styled.nav`
  display: grid;
  gap: 1rem;
  align-items: center;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  padding: 2rem;
`;
