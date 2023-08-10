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
  const { getDisplay, button, title, type } = texts;
  console.log(getDisplay, button, title, type);
  const modalTitle = getDisplay[button](type);
  const { closeModal } = useModalContext();
  return (
    <StyledTableToolbarModal>
      <StyledModalTitle>{modalTitle}</StyledModalTitle>
      <p className='modalText'>{getDisplay[`${button}Ensure`](title)}</p>
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
