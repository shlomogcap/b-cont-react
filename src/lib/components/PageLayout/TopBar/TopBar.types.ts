import { BreadcrumbsProps } from '../Breadcrubms/Breadcrumbs.types';
import { PageLayoutProps } from '../PageLayout.types';

export type TopBarProps = Pick<PageLayoutProps, 'title'> & {
  breadcrumbs?: BreadcrumbsProps['breadcrumbs'];
};
