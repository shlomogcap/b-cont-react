import { css } from 'styled-components';

export const activateButtonMixin = css`
  &:hover {
    box-shadow: var(--box-shadow-1);
    transform: translateY(-0.3rem);
  }
  &:active {
    transform: translate(-0.1rem, 0.1rem);
    box-shadow: var(--box-shadow-light);
  }
`;
