import { ReactNode } from 'react';
import { EModalName } from './ModalName';
import { ISwitchRouteModalData } from '@/lib/components/SwitchRouteModal';
import { IContractSectionModalData } from '@/lib/components/ContractSectionModal';
import { IPeriodSelectionModalData } from '@/lib/components/PeriodSelectionModal';
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
  | IPeriodSelectionModalData
  | ITableToolBarModalData
);
