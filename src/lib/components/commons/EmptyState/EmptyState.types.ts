import { ReactNode } from 'react';

export type IEmptyStateProps = {
  rows?: number;
  content?: ReactNode;
  animation?: 'pulse' | 'none';
};
