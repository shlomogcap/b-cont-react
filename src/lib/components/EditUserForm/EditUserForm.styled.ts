import styled from 'styled-components';
import { Modal } from '../commons/Modal';
import { StyledForm } from '../commons/Form/Form.styled';
import { StyledModalBox } from '../commons/Modal/Modal.styled';

export const StyledEditUserModal = styled(Modal)`
  & ${StyledModalBox} {
    align-content: flex-start;
    min-height: 50vh;
  }
  & ${StyledForm} {
    padding-block-start: 4rem;
  }
`;
