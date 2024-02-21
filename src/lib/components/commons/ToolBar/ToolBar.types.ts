import { EToolbarButtons, EToolbarText } from './ToolBar.consts';

export type IGetDisplayTextFunc = (...args: string[]) => string;

export type IToolBarProps = {
  toolbar: {
    buttons: EToolbarButtons[];
    getDisplay: Record<EToolbarText, IGetDisplayTextFunc>;
    type: EToolbarText;
  };
  path: string;
  title?: string;
};

export type IToolbarModalProps = {
  path: string;
};
