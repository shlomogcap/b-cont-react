import { ReactNode } from 'react';
import { EModalName } from './ModalName';
import { ISwitchRouteModalData } from '@/lib/components/SwitchRouteModal';

export type IModalProviderProps = {
  children?: ReactNode;
};

export type IModalContext = {
  showModal: (data: IModalData) => void;
  closeModal: () => void;
};

export type IModalData = { name: EModalName } & ISwitchRouteModalData;
