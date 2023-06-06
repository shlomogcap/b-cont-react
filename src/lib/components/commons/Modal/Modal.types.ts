import { ReactNode } from 'react';

export type IModalProps = {
  title?: ReactNode;
  className?: string;
  disabledOutsideClick?: boolean;
};

export type IStyledModalProps = {
  disabledOutsideClick: boolean;
};
