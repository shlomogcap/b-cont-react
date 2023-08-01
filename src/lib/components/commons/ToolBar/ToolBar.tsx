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
import { EModalName } from '@/lib/context/ModalProvider/ModalName';

export const ToolBar = ({ path }: IToolBarProps) => {
  const { showModal } = useModalContext();

  const handleDuplicate = async () => {
    // TODO: duplicate functionality
    toast.success(DISPLAY_TEXTS.he.toasts[EToastType.AddingNewDoc]);
  };

  const handleDelete = async () => {
    const DELETE_TEXT = DISPLAY_TEXTS.he.toasts[EToastType.DeletedDoc];
    try {
      const docRef = doc(firestore, path);
      await deleteDoc(docRef);
      toast.success(DELETE_TEXT);
    } catch {
      toast.error(DELETE_TEXT);
    }
  };
  return (
    <StyledToolbar>
      <StyledToolbarButton
        variant='danger'
        onClick={(e) => {
          e.stopPropagation();
          showModal({
            texts: {
              display: DISPLAY_TEXTS.he.buttons,
              title: EButtonTexts.AreYouSure,
              buttons: [EButtonTexts.Delete, EButtonTexts.Abort],
            },
            name: EModalName.TableToolbar,
            action: handleDelete,
          });
        }}
      >
        <DeleteIcon />
      </StyledToolbarButton>
      <StyledToolbarButton
        onClick={(e) => {
          e.stopPropagation();
          showModal({
            texts: {
              display: DISPLAY_TEXTS.he.buttons,
              title: EButtonTexts.AreYouSure,
              buttons: [EButtonTexts.Duplicate, EButtonTexts.Abort],
            },
            name: EModalName.TableToolbar,
            action: handleDuplicate,
          });
        }}
      >
        <CopyIcon />
      </StyledToolbarButton>
    </StyledToolbar>
  );
};
