import { EModalName } from '@/lib/context/ModalProvider/ModalName';

export type ITableToolBarModalProps = {
  texts: {
    display: any;
    title: string;
    buttons: string[];
  };
  action: () => void;
};

export type ITableToolBarModalData = ITableToolBarModalProps & {
  name: EModalName.TableToolbar;
};
