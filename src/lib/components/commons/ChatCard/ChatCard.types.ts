import { ReactNode } from 'react';

export type IChatCardProps = {
  title: ReactNode;
  className?: string;
  addNewText: string;
  handleAddItem?: () => void;
};

export type IChatBubblProps = {
  title: string;
  description?: string;
  createdAt?: string;
  pinned?: boolean;
  className?: string;
  togglePinned?: () => void;
};
