import { IBlocksGridProps } from '../../commons/BlocksGrid/BlocksGrid.types';

export type TBreadcrumbProps = {
  id: string | number;
  text: string;
  href?: string;
  navList?: IBlocksGridProps['items'];
};

export type TBreadcrumbsProps = {
  breadcrumbs: IBreadcrumbProps[];
};

export type TStyledBreadcrumbProps = {
  actionable: boolean;
  hasArrow: boolean;
};
