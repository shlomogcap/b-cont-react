import styled from 'styled-components';
import { Modal } from '../commons/Modal';
import { StyledModalBox } from '../commons/Modal/Modal.styled';

export const StyledContractAddSectionModal = styled(Modal)`
  & ${StyledModalBox} {
    width: 50vw;
    height: 70vh;
    align-content: flex-start;
  }
`;
