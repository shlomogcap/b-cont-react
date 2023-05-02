import styled from 'styled-components';
import { CURRENT_COLOR_CLASS_NAME } from './SvgIcon.consts';

export const StyledSvgIcon = styled.svg`
  color: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  backface-visibility: hidden;
  & .${CURRENT_COLOR_CLASS_NAME} {
    fill: currentColor;
  }
`;
