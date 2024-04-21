import { EToolbarButtons, EToolbarText } from './ToolBar.consts';

export type IGetDisplayTextFunc = (...args: string[]) => string;

export type IToolbarSettings = {
  buttons: EToolbarButtons[];
  getDisplay: Record<EToolbarText, IGetDisplayTextFunc>;
  type: EToolbarText;
};

export type IToolBarProps = {
  toolbar: IToolbarSettings;
  path: string;
  title?: string;
};

export type IToolbarModalProps = {
  path: string;
};
