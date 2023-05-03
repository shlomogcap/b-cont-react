import Link from 'next/link';
import { StyledBreadcrumb } from './Breadcrumbs.styled';
import { BreadcrumbProps } from './Breadcrumbs.types';

export const Breadcrumb = ({ text, href, navList }: BreadcrumbProps) => {
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
