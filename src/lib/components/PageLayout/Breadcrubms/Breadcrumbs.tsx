import { Breadcrumb } from './Breadcrumb';
import { StyledBreadcrumbs } from './Breadcrumbs.styled';
import { IBreadcrumbsProps } from './Breadcrumbs.types';

export const Breadcrumbs = ({ breadcrumbs }: IBreadcrumbsProps) => {
  return (
    <StyledBreadcrumbs>
      {breadcrumbs.map(({ id, ...props }) => (
        <Breadcrumb key={id} id={id} {...props} />
      ))}
    </StyledBreadcrumbs>
  );
};
