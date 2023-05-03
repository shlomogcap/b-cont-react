import {
  BreadcrumbProps,
  BreadcrumbsProps,
} from './Breadcrubms/Breadcrumbs.types';

export type PageLayoutProps = {
  title?: string;
  className?: string;
  breadcrubms?: BreadcrumbsProps['breadcrumbs'];
};
