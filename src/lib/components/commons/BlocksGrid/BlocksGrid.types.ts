import { ReactElement } from 'react';

type BlockElement = {
  id: string | number;
  text?: string;
  icon?: ReactElement;
};

export type BlocksGridProps = {
  items: BlockElement[];
};
