import styled from 'styled-components';
import { Modal } from '../commons/Modal';
import { StyledModalBox } from '../commons/Modal/Modal.styled';

export const StyledTableToolbarModal = styled(Modal)`
  & ${StyledModalBox} {
    overflow: hidden;
    display: grid;
    place-items: center;
    min-height: 20rem;
    & .modalText {
      margin-block-start: 2rem;
    }
    & .buttonsWrapper {
      width: 100%;
      display: flex;
      justify-content: space-evenly;
    }
  }
`;
