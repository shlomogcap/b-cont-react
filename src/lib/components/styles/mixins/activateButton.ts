import { css } from 'styled-components';

export const activateButtonMixin = css`
  &:hover {
    box-shadow: var(--box-shadow-1);
    transform: translateY(-0.2rem);
  }
  &:active {
    transform: translate(-0.1rem, 0.1rem);
    box-shadow: var(--box-shadow-light);
  }
`;
export const resetActivateButtonMixin = css`
  &:hover {
    box-shadow: none;
    transform: none;
  }
  &:active {
    transform: none;
    box-shadow: none;
  }
`;
