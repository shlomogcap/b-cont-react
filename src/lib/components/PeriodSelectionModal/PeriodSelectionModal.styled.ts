import styled from 'styled-components';
import { Modal } from '../commons/Modal';
import {
  StyledDropdownField,
  StyledDropdownTag,
} from '../commons/Input/inputs/DropdownInput/DropdownInput.styled';
import { StyledListItem } from '../commons/OptionsList/OptionsList.styled';
import { StyledModalBox } from '../commons/Modal/Modal.styled';
import { StyledForm } from '../commons/Form/Form.styled';

export const StyledPeriodSelectionModal = styled(Modal)`
  & ${StyledModalBox} {
    min-height: 70vh;
    min-width: 50vw;
    align-content: flex-start;
  }
  & ${StyledDropdownField}, & ${StyledDropdownTag} {
    direction: ltr;
    justify-content: center;
  }
  & ${StyledListItem} {
    direction: ltr;
    justify-content: center;
  }
`;
