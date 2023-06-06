import Link from 'next/link';
import { StyledBreadcrumb, StyledNavListArrow } from './Breadcrumbs.styled';
import { IBreadcrumbProps } from './Breadcrumbs.types';
import { TriangleArrowIcon } from '../../icons/TriangleArrowIcon';
import { useModalContext } from '@/lib/context/ModalProvider/ModalProvider';
import { EModalName } from '@/lib/context/ModalProvider/ModalName';

export const Breadcrumb = ({ text, href, navList }: IBreadcrumbProps) => {
  const hasNavList = Boolean(navList);
  const actionable = Boolean(hasNavList || href);
  const { showModal } = useModalContext();
  const element = (
    <StyledBreadcrumb
      hasArrow={hasNavList}
      actionable={actionable}
      onClick={
        hasNavList
          ? () => {
              showModal({ name: EModalName.SwitchRoute, items: navList ?? [] });
            }
          : undefined
      }
    >
      {text}
      <StyledNavListArrow direction='down' />
    </StyledBreadcrumb>
  );
  return href ? <Link href={href}>{element}</Link> : element;
};
