import { IBreadcrumbsProps } from '../Breadcrubms/Breadcrumbs.types';
import { IPageLayoutProps } from '../PageLayout.types';

export type TTopBarProps = Pick<IPageLayoutProps, 'title'> & {
  breadcrumbs?: IBreadcrumbsProps['breadcrumbs'];
};
