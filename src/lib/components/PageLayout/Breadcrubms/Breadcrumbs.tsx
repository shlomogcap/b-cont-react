import { Breadcrumb } from './Breadcrumb';
import { StyledBreadcrumbs } from './Breadcrumbs.styled';
import { BreadcrumbsProps } from './Breadcrumbs.types';

export const Breadcrumbs = ({ breadcrumbs }: BreadcrumbsProps) => {
  return (
    <StyledBreadcrumbs>
      {breadcrumbs.map(({ id, ...props }) => (
        <Breadcrumb key={id} id={id} {...props} />
      ))}
    </StyledBreadcrumbs>
  );
};
