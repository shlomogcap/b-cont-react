import { Button } from '../Button';
import { StyledFormFooter } from '../Form/Form.styled';
import {
  StyledConfirmationModal,
  StyledConfirmationModalActions,
} from './ConfirmationModal.styled';
import { IConfirmationModalProps } from './ConfirmationModal.types';

export const ConfirmationModal = ({
  title,
  content,
  actions,
}: IConfirmationModalProps) => {
  return (
    <StyledConfirmationModal disabledOutsideClick title={title}>
      {content}
      <StyledConfirmationModalActions>
        {actions.map((action, index) => (
          <Button key={index} {...action} />
        ))}
      </StyledConfirmationModalActions>
    </StyledConfirmationModal>
  );
};
