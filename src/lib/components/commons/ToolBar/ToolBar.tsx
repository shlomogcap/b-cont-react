import { CopyIcon, DeleteIcon } from '../../icons';
import { StyledToolbar, StyledToolbarButton } from './ToolBar.styled';
import { IToolBarProps } from './ToolBar.types';
import { useModalContext } from '@/lib/context/ModalProvider/ModalProvider';
import { EModalName } from '@/lib/context/ModalProvider/ModalName';
import { ReactElement } from 'react';
import { EToolbarButtons } from './ToolBar.consts';
import { actions } from './ToolBar.utils';

export const ToolBar = ({ path, toolbar, title }: IToolBarProps) => {
  const { showModal } = useModalContext();
  const { buttons, getDisplay, type } = toolbar;
  const TOOLBAR_ICONS: Record<EToolbarButtons, ReactElement> = {
    [EToolbarButtons.Duplicate]: <CopyIcon />,
    [EToolbarButtons.Delete]: <DeleteIcon />,
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
                getDisplay,
                button,
                title: title ?? '---',
                type,
              },
              name: EModalName.TableToolbar,
              action: () => actions[button](path, type),
            });
          }}
        >
          {TOOLBAR_ICONS[button]}
        </StyledToolbarButton>
      ))}
    </StyledToolbar>
  );
};
