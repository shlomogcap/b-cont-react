import { ReactNode } from 'react';
import { EModalName } from './ModalName';
import { ISwitchRouteModalData } from '@/lib/components/SwitchRouteModal';

export type TModalProviderProps = {
  children?: ReactNode;
};

export type TModalContext = {
  showModal: (data: IModalData) => void;
  closeModal: () => void;
};

export type TModalData = { name: EModalName } & ISwitchRouteModalData;
