import { useContext, useState, createContext } from 'react';
import { EModalName } from './ModalName';
import {
  IModalContext,
  IModalData,
  IModalProviderProps,
} from './ModalProvider.types';
import { SwitchRouteModal } from '@/lib/components/SwitchRouteModal';
import { ContractSectionModal } from '@/lib/components/ContractSectionModal';
import { PeriodSelectionModal } from '@/lib/components/PeriodSelectionModal';

const ModalContext = createContext<IModalContext>({
  showModal: () => null,
  closeModal: () => null,
});

export const useModalContext = () => useContext(ModalContext);

const renderModal = (modalData: IModalData) => {
  switch (modalData.name) {
    case EModalName.SwitchRoute:
      return <SwitchRouteModal {...modalData} />;
    case EModalName.SectionWsForm:
      return <ContractSectionModal {...modalData} />;
    case EModalName.PeriodSelectionForm:
      return <PeriodSelectionModal {...modalData} />;
    default:
      return null;
  }
};

export const ModalProvider = ({ children }: IModalProviderProps) => {
  const [modalData, setModalData] = useState<IModalData | null>();
  const showModal = (data: IModalData) => {
    setModalData(data);
  };
  const closeModal = () => {
    setModalData(null);
  };
  return (
    <ModalContext.Provider value={{ showModal, closeModal }}>
      {children}
      {modalData && renderModal(modalData)}
    </ModalContext.Provider>
  );
};
