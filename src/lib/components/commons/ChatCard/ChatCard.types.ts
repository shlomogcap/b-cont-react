import { ReactNode } from 'react';

type ITogglePinnedFunc = (args: { path: string; pinned: boolean }) => void;

export type IChatCardProps = {
  title: ReactNode;
  className?: string;
  addNewText: string;
  handleAddItem?: () => void;
  handleItemClicked?: (item?: object) => void;
  handleTogglePinned?: ITogglePinnedFunc;
  items: any[];
};

export type IChatBubbleProps = {
  title: string;
  description?: string;
  createdAt?: string;
  pinned?: boolean;
  className?: string;
  togglePinned?: () => void;
  onItemClick?: () => void;
};
