import { IBlocksGridProps } from '../../commons/BlocksGrid/BlocksGrid.types';

export type IBreadcrumbProps = {
  id: string | number;
  text: string;
  href?: string;
  navList?: IBlocksGridProps['items'];
};

export type IBreadcrumbsProps = {
  breadcrumbs: IBreadcrumbProps[];
};

export type IStyledBreadcrumbProps = {
  actionable: boolean;
  hasArrow: boolean;
};
