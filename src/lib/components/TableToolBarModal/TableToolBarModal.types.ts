import { EModalName } from '@/lib/context/ModalProvider/ModalName';
import {
  EToolbarButtons,
  EToolbarText,
} from '../commons/ToolBar/ToolBar.consts';

export type ITableToolBarModalProps = {
  texts: {
    display: any;
    type: EToolbarText;
    button: EToolbarButtons;
    title: string;
  };
  action: () => void;
};

export type ITableToolBarModalData = ITableToolBarModalProps & {
  name: EModalName.TableToolbar;
};
