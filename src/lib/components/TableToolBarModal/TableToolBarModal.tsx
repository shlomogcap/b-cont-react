import { Button } from '../commons/Button';
import { StyledModalTitle } from '../commons/Modal/Modal.styled';
import { StyledTableToolbarModal } from './TableToolBarModal.styled';
import { ITableToolBarModalProps } from './TableToolBarModal.types';
import { useModalContext } from '@/lib/context/ModalProvider/ModalProvider';

export const TableToolBarModal = ({
  texts,
  action,
}: ITableToolBarModalProps) => {
  const { display, title, buttons } = texts;
  const { closeModal } = useModalContext();
  return (
    <StyledTableToolbarModal>
      <StyledModalTitle>{display[title]}</StyledModalTitle>
      {buttons.map((btn, index) => (
        <Button
          variant={btn === 'delete' ? 'danger' : 'primary'}
          onClick={() => {
            btn !== 'abort' && action();
            closeModal();
          }}
          key={index}
        >
          {display[btn]}
        </Button>
      ))}
    </StyledTableToolbarModal>
  );
};
