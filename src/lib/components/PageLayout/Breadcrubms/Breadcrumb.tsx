import Link from 'next/link';
import { StyledBreadcrumb } from './Breadcrumbs.styled';
import { IBreadcrumbProps } from './Breadcrumbs.types';
import { TriangleArrowIcon } from '../../icons/TriangleArrowIcon';

export const Breadcrumb = ({ text, href, navList }: IBreadcrumbProps) => {
  const hasNavList = Boolean(navList);
  const actionable = Boolean(hasNavList || href);
  const element = (
    <StyledBreadcrumb
      actionable={actionable}
      onClick={
        hasNavList
          ? () => {
              null;
            }
          : undefined
      }
    >
      {text}
      {hasNavList && <TriangleArrowIcon direction='down' />}
    </StyledBreadcrumb>
  );
  return href ? <Link href={href}>{element}</Link> : element;
};
