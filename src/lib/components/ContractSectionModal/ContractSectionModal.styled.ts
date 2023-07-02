import styled from 'styled-components';
import { Modal } from '../commons/Modal';
import { StyledModalBox } from '../commons/Modal/Modal.styled';

export const StyledContractSectionModal = styled(Modal)`
  & ${StyledModalBox} {
    width: 60vw;
    height: 90vh;
    align-content: flex-start;
  }
`;
