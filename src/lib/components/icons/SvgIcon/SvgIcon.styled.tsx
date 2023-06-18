import styled from 'styled-components';
import {
  CURRENT_COLOR_CLASS_NAME,
  POINTER_CURSOR_CLASS_NAME,
} from './SvgIcon.consts';

export const StyledSvgIcon = styled.svg`
  color: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  backface-visibility: hidden;
  color: var(--color-non-active);
  & .${CURRENT_COLOR_CLASS_NAME} {
    fill: currentColor;
  }
  &.${POINTER_CURSOR_CLASS_NAME} {
    cursor: pointer;
  }
`;
