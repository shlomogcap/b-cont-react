import { Button } from '../commons/Button';
import { StyledModalTitle } from '../commons/Modal/Modal.styled';
import { StyledTableToolbarModal } from './TableToolBarModal.styled';
import { ITableToolBarModalProps } from './TableToolBarModal.types';
import { useModalContext } from '@/lib/context/ModalProvider/ModalProvider';
import { DISPLAY_TEXTS, EButtonTexts } from '@/lib/consts/displayTexts';
export const TableToolBarModal = ({
  texts,
  action,
}: ITableToolBarModalProps) => {
  const buttonsText = DISPLAY_TEXTS.he.buttons;
  const { display, button, title, type } = texts;
  const { closeModal } = useModalContext();
  return (
    <StyledTableToolbarModal>
      <StyledModalTitle>{display[button](display[type])}</StyledModalTitle>
      <p className='modalText'>{display[`${button}Ensure`](title)}</p>
      <div className='buttonsWrapper'>
        <Button
          variant={String(button) === 'delete' ? 'danger' : 'primary'}
          onClick={() => {
            action();
            closeModal();
          }}
        >
          {buttonsText[button]}
        </Button>
        <Button
          variant={'secondary'}
          onClick={() => {
            closeModal();
          }}
        >
          {buttonsText[EButtonTexts.Abort]}
        </Button>
      </div>
    </StyledTableToolbarModal>
  );
};
