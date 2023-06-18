import { ReactElement } from 'react';

type TBlockElement = {
  id: string | number;
  text?: string;
  icon?: ReactElement;
  href?: string;
  onClick?: () => void;
};

export type TBlocksGridProps = {
  items: IBlockElement[];
};
