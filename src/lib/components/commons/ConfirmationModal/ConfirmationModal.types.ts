import { ReactNode } from 'react';
import { IModalProps } from '../Modal';
import { IButtonProps } from '../Button';
import { EModalName } from '@/lib/context/ModalProvider/ModalName';

export type IConfirmationModalAction = IButtonProps;

export type IConfirmationModalProps = IModalProps & {
  content: ReactNode;
  actions: IConfirmationModalAction[];
};

export type IConfirmationModalData = IConfirmationModalProps & {
  name: EModalName.ConfirmationModal;
};
