import { ReactElement } from 'react';

type IBlockElement = {
  id: string | number;
  text?: string;
  icon?: ReactElement;
  href?: string;
  onClick?: () => void;
  selected?: boolean;
};

export type IBlocksGridProps = {
  items: IBlockElement[];
};
