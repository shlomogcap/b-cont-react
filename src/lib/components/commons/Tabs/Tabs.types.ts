import { MouseEventHandler } from 'react';

type ITab<T extends string> = {
  id: T;
  text: string;
  href?: string;
};

export type ITabsProps<T extends string> = {
  activeTab: T;
  setActiveTab: (tab: T) => void;
  tabs: ITab<T>[];
};

export type ITabProps<T extends string = string> = Omit<ITab<T>, 'id'> & {
  isActive: boolean;
  onClick: MouseEventHandler<HTMLDivElement>;
};
