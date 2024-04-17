import styled from 'styled-components';
import { Modal } from '../commons/Modal';
import { StyledForm } from '../commons/Form/Form.styled';

export const StyledLoginModal = styled(Modal)`
  & ${StyledForm} {
    padding-block-start: 4rem;
  }
`;
