import { EModalName } from '@/lib/context/ModalProvider/ModalName';
import {
  EToolbarButtons,
  EToolbarText,
} from '../commons/ToolBar/ToolBar.consts';
import { IGetDisplayTextFunc } from '../commons/ToolBar';

export type ITableToolBarModalProps = {
  texts: {
    getDisplay: Record<EToolbarText, IGetDisplayTextFunc>;
    type: string;
    button: EToolbarButtons;
    title: string;
  };
  action: () => void;
};

export type ITableToolBarModalData = ITableToolBarModalProps & {
  name: EModalName.TableToolbar;
};
