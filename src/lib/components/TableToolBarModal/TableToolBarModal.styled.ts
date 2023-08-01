import styled from 'styled-components';
import { Modal } from '../commons/Modal';
import { StyledModalBox } from '../commons/Modal/Modal.styled';

export const StyledTableToolbarModal = styled(Modal)`
  /* & div {
   
  } */
  & ${StyledModalBox} {
    overflow: hidden;
    display: flex;
    place-content: center;
    min-height: 20rem;
  }
`;
