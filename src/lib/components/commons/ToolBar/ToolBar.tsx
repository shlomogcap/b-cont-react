import { deleteDoc, doc } from 'firebase/firestore';
import { CopyIcon, DeleteIcon } from '../../icons';
import {
  StyledToolbar,
  StyledToolbarButton,
  StyledToolbarModal,
} from './ToolBar.styled';
import { IToolBarProps, IToolbarModalProps } from './ToolBar.types';
import { firestore } from '@/lib/firebase';
import { useState } from 'react';
import { Button } from '../Button';
import { StyledModal, StyledModalTitle } from '../Modal/Modal.styled';
import {
  DISPLAY_TEXTS,
  EButtonTexts,
  EToastType,
} from '@/lib/consts/displayTexts';
import { toast } from 'react-toastify';
import { useModalContext } from '@/lib/context/ModalProvider/ModalProvider';
const ToolbarModal = ({ path, setIsModalOpen }: IToolbarModalProps) => {
  const handleDelete = async () => {
    try {
      const docRef = doc(firestore, path);
      await deleteDoc(docRef);
      toast.success(DISPLAY_TEXTS.he.toasts[EToastType.DeletedDoc]);
    } catch {
      toast.error(DISPLAY_TEXTS.he.toasts[EToastType.DeletedDoc]);
    }
  };
  return (
    <StyledModal
      onClick={(e) => {
        e.stopPropagation();
      }}
      disabledOutsideClick={false}
    >
      <StyledToolbarModal>
        <StyledModalTitle>
          {DISPLAY_TEXTS.he.buttons[EButtonTexts.AreYouSure]}
        </StyledModalTitle>
        <Button
          variant='danger'
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
        >
          {DISPLAY_TEXTS.he.buttons[EButtonTexts.Delete]}
        </Button>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            setIsModalOpen(false);
          }}
        >
          {DISPLAY_TEXTS.he.buttons[EButtonTexts.Abort]}
        </Button>
      </StyledToolbarModal>
    </StyledModal>
  );
};

export const ToolBar = ({ path }: IToolBarProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <StyledToolbar>
        {isModalOpen && (
          <ToolbarModal path={path} setIsModalOpen={setIsModalOpen} />
        )}
        <StyledToolbarButton
          variant='danger'
          onClick={(e) => {
            e.stopPropagation();
            setIsModalOpen(true);
          }}
        >
          <DeleteIcon />
        </StyledToolbarButton>
        <StyledToolbarButton>
          <CopyIcon />
        </StyledToolbarButton>
      </StyledToolbar>
    </>
  );
};
