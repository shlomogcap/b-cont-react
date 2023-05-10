import { IBreadcrumbsProps } from '../Breadcrubms/Breadcrumbs.types';
import { IPageLayoutProps } from '../PageLayout.types';

export type ITopBarProps = Pick<IPageLayoutProps, 'title'> & {
  breadcrumbs?: IBreadcrumbsProps['breadcrumbs'];
};
