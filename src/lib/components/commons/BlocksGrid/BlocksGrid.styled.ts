import styled from 'styled-components';
import { activateButtonMixin } from '../../styles/mixins/activateButton';

export const StyledIBlockElement = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  font-size: var(--font-size-large);
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
  transition: all 0.2s ease-in-out;
  ${activateButtonMixin}
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
