import { ReactNode } from 'react';

type ITogglePinnedFunc = (args: { path: string; pinned: boolean }) => void;

export type IChatItem = {
  path: string;
  pinned: boolean;
  title: string;
  description?: string;
  source?: string;
  [key: string]: unknown;
};

export type IChatCardProps<T extends IChatItem> = {
  title: ReactNode;
  className?: string;
  addNewText: string;
  handleAddItem?: () => void;
  handleItemClicked?: (item?: T) => void;
  handleTogglePinned?: ITogglePinnedFunc;
  items: T[];
};

export type IChatBubbleProps = {
  title: string;
  description?: string;
  createdAt?: string;
  createdBy?: string;
  pinned?: boolean;
  className?: string;
  source?: string;
  togglePinned?: () => void;
  onItemClick?: () => void;
};
