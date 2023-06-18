import { ReactNode } from 'react';

export type TEmptyStateProps = {
  rows?: number;
  content?: ReactNode;
  animation?: 'pulse' | 'none';
};
