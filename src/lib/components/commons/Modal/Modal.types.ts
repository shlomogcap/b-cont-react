import { ReactNode } from 'react';

export type TModalProps = {
  title?: ReactNode;
  className?: string;
  disabledOutsideClick?: boolean;
};

export type TStyledModalProps = {
  disabledOutsideClick: boolean;
};
