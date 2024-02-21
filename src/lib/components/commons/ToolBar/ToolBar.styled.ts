import styled from 'styled-components';
import { StyledButton } from '../Button';
import { StyledModalBox } from '../Modal/Modal.styled';
import { StyledSvgIcon } from '../../icons/SvgIcon/SvgIcon.styled';

export const StyledToolbarButton = styled(StyledButton)`
  & ${StyledSvgIcon} {
    color: white;
  }
`;

export const StyledToolbar = styled.div`
  position: absolute;
  z-index: 1;
  inset-inline-end: 0;
  height: 100%;
  display: flex;
  align-items: center;
  opacity: 0;
  transition-duration: 0.5s;
  transition-timing-function: ease;
  & ${StyledButton} {
    scale: 75%;
    border-radius: 50%;
  }
`;

export const StyledToolbarModal = styled(StyledModalBox)`
  overflow: hidden;
  place-items: center;
`;
