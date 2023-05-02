import { ReactNode } from 'react';

type BlockElement = {
  id: string | number;
  text?: string;
  icon?: ReactNode;
};

export type BlocksGridProps = {
  items: BlockElement[];
};
