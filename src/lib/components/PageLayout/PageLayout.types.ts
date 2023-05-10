import {
  BreadcrumbProps,
  IBreadcrumbsProps,
} from './Breadcrubms/Breadcrumbs.types';

export type IPageLayoutProps = {
  title?: string;
  className?: string;
  breadcrubms?: IBreadcrumbsProps['breadcrumbs'];
};
