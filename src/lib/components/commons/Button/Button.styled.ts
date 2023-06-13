import styled, { css } from 'styled-components';
import { IButtonProps } from './Button.types';
import {
  activateButtonMixin,
  resetActivateButtonMixin,
} from '../../styles/mixins/activateButton';

export const StyledButton = styled.button<IButtonProps>`
  font: inherit;
  font-size: 2rem;
  background-color: var(--color-active);
  color: var(--color-white);
  border-radius: 0.5rem;
  min-height: 3rem;
  min-width: fit-content;
  max-width: 20rem;
  outline: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 1.1rem;
  font-weight: 500;
  position: relative;
  transition: all 0.2s;
  ${activateButtonMixin}
  &:disabled {
    cursor: not-allowed;
    background-color: var(--color-gray-2);
    color: var(--color-non-active);
  }
  ${({ variant }) => {
    switch (variant) {
      case 'secondary':
        return css`
          color: var(--color-active-light);
          background-color: var(--color-bg-layout);
        `;
      case 'danger':
        return css`
          background-color: var(--color-red);
        `;
    }
  }}
`;

export const StyledButtonMenuButton = styled(StyledButton)`
  ${resetActivateButtonMixin}
`;
