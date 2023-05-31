import styled from 'styled-components';
import { CURRENT_COLOR_CLASS_NAME, POINTER } from './SvgIcon.consts';

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
  & .${POINTER} {
    cursor: pointer;
  }
`;
