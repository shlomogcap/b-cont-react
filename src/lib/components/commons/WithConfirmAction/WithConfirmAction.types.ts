import { ReactElement, ReactNode } from 'react';
import { IButtonProps } from '../Button';

export type IWithConfirmActionProps = {
  onConfirm: () => void;
  confirmText?: string;
  actionText?: string;
  actionButtonVariant?: IButtonProps['variant'];
  abortText?: string;
  children: ReactElement;
};
