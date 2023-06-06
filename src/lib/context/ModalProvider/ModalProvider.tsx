import { useContext, useState, createContext } from 'react';
import { EModalName } from './ModalName';
import {
  IModalContext,
  IModalData,
  IModalProviderProps,
} from './ModalProvider.types';
import { SwitchRouteModal } from '@/lib/components/SwitchRouteModal';

const ModalContext = createContext<IModalContext>({
  showModal: () => null,
  closeModal: () => null,
});

export const useModalContext = () => useContext(ModalContext);

const renderModal = ({ name, ...modalProps }: IModalData) => {
  switch (name) {
    case EModalName.SwitchRoute:
      return <SwitchRouteModal {...modalProps} />;
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
