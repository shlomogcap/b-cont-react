import { IBreadcrumbsProps } from './Breadcrubms/Breadcrumbs.types';

export type TPageLayoutProps = {
  title?: string;
  className?: string;
  breadcrubms?: IBreadcrumbsProps['breadcrumbs'];
};
