import { StyledBreadcrumb } from './Breadcrumbs.styled';
import { BreadcrumbProps } from './Breadcrumbs.types';

export const Breadcrumb = ({ text, href, navList }: BreadcrumbProps) => {
  return <StyledBreadcrumb>{text}</StyledBreadcrumb>;
};
