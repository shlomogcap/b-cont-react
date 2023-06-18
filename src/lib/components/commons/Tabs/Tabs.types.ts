import { MouseEventHandler, ReactNode } from 'react';

type TTab<T extends string> = {
  id: T;
  text: string;
  href?: string;
};

export type TTabsProps<T extends string> = {
  activeTab: T;
  setActiveTab: (tab: T) => void;
  tabs: ITab<T>[];
};

export type TTabProps<T extends string = string> = Omit<ITab<T>, 'id'> & {
  isActive: boolean;
  onClick: MouseEventHandler<HTMLDivElement>;
};
