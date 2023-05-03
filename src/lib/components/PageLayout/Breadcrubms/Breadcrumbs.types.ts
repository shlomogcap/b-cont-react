import { BlocksGridProps } from '../../commons/BlocksGrid/BlocksGrid.types';

export type BreadcrumbProps = {
  id: string | number;
  text: string;
  href?: string;
  navList?: BlocksGridProps['items'];
};

export type BreadcrumbsProps = {
  breadcrumbs: BreadcrumbProps[];
};
