import { ReactElement } from 'react';

type BlockElement = {
  id: string | number;
  text?: string;
  icon?: ReactElement;
  href?: string;
  onClick?: () => void;
};

export type BlocksGridProps = {
  items: BlockElement[];
};
