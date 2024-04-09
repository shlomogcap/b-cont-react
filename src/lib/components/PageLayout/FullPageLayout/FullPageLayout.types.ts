import { ITooltipProps } from '../../commons/Tooltip';
import { IBreadcrumbsProps } from '../Breadcrubms';

export type IFullPageLayoutProps = {
  className?: string;
  breadcrubms?: IBreadcrumbsProps['breadcrumbs'];
  onBackClick: () => void;
  backTooltipContent?: ITooltipProps['content'];
};
