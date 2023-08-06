import { EToolbarButtons, EToolbarText } from './ToolBar.consts';

export type IToolBarProps = {
  toolbar: {
    buttons: EToolbarButtons[];
    display: Record<EToolbarText, string | ((arg0: string) => string)>;
    type: EToolbarText;
  };
  path: string;
  title: string | undefined;
};

export type IToolbarModalProps = {
  path: string;
};
