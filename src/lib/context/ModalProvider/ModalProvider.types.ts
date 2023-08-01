import { ReactNode } from 'react';
import { EModalName } from './ModalName';
import { ISwitchRouteModalData } from '@/lib/components/SwitchRouteModal';
import { IContractSectionModalData } from '@/lib/components/ContractSectionModal';
import { ITableToolBarModalData } from '@/lib/components/TableToolBarModal';

export type IModalProviderProps = {
  children?: ReactNode;
};

export type IModalContext = {
  showModal: (data: IModalData) => void;
  closeModal: () => void;
};

export type IModalData = { name: EModalName } & (
  | ISwitchRouteModalData
  | IContractSectionModalData
  | ITableToolBarModalData
);
