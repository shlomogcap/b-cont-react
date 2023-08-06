import { deleteDoc, doc } from 'firebase/firestore';
import { CopyIcon, DeleteIcon } from '../../icons';
import { StyledToolbar, StyledToolbarButton } from './ToolBar.styled';
import { IToolBarProps } from './ToolBar.types';
import { firestore } from '@/lib/firebase';
import { DISPLAY_TEXTS, EToastType } from '@/lib/consts/displayTexts';
import { toast } from 'react-toastify';
import { useModalContext } from '@/lib/context/ModalProvider/ModalProvider';
import { EModalName } from '@/lib/context/ModalProvider/ModalName';
import { ReactElement } from 'react';
import { EToolbarButtons, EToolbarText } from './ToolBar.consts';

export const ToolBar = ({ path, toolbar, title }: IToolBarProps) => {
  const { showModal } = useModalContext();
  const { buttons, display, type } = toolbar;
  const actions = {
    duplicate: async () => {
      // TODO: duplicate functionality
      toast.success(DISPLAY_TEXTS.he.toasts[EToastType.AddingNewDoc]);
    },
    delete: async () => {
      const DELETE_TEXT = DISPLAY_TEXTS.he.toasts[EToastType.DeletedDoc];
      try {
        const docRef = doc(firestore, path);
        await deleteDoc(docRef);
        toast.success(DELETE_TEXT);
      } catch {
        toast.error(DELETE_TEXT);
      }
    },
  };

  const TOOLBAR_ICONS: Record<EToolbarButtons, ReactElement> = {
    [EToolbarText.Duplicate]: <CopyIcon />,
    [EToolbarText.Delete]: <DeleteIcon />,
  };
  return (
    <StyledToolbar>
      {buttons.map((button: EToolbarButtons, index: number) => (
        <StyledToolbarButton
          key={index}
          variant={String(button) === 'delete' ? 'danger' : 'primary'}
          onClick={(e) => {
            e.stopPropagation();
            showModal({
              texts: {
                display,
                button,
                title: title ?? '---',
                type,
              },
              name: EModalName.TableToolbar,
              action: actions[button],
            });
          }}
        >
          {TOOLBAR_ICONS[button]}
        </StyledToolbarButton>
      ))}
    </StyledToolbar>
  );
};
