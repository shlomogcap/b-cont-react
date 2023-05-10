import Link from 'next/link';
import { StyledBreadcrumb } from './Breadcrumbs.styled';
import { IBreadcrumbProps } from './Breadcrumbs.types';

export const Breadcrumb = ({ text, href, navList }: IBreadcrumbProps) => {
  const element = (
    <StyledBreadcrumb
      onClick={
        navList
          ? () => {
              null;
            }
          : undefined
      }
    >
      {text}
    </StyledBreadcrumb>
  );
  return href ? <Link href={href}>{element}</Link> : element;
};
