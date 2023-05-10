import { ReactElement } from 'react';

type IBlockElement = {
  id: string | number;
  text?: string;
  icon?: ReactElement;
  href?: string;
  onClick?: () => void;
};

export type IBlocksGridProps = {
  items: IBlockElement[];
};
