import { PropsWithChildren } from 'react';
import { IModalProps } from './Modal.types';
import { StyledModal, StyledModalBox, StyledModalTitle } from './Modal.styled';
import { useModalContext } from '@/lib/context/ModalProvider/ModalProvider';

export const Modal = ({
  children,
  className,
  title,
  disabledOutsideClick,
}: PropsWithChildren<IModalProps>) => {
  const { closeModal } = useModalContext();
  return (
    <StyledModal
      className={className}
      onClick={() => disabledOutsideClick || closeModal()}
      disabledOutsideClick={Boolean(disabledOutsideClick)}
    >
      <StyledModalBox onClick={(e) => e.stopPropagation()}>
        {title && <StyledModalTitle>{title}</StyledModalTitle>}
        {children}
      </StyledModalBox>
    </StyledModal>
  );
};
