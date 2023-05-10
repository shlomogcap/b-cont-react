import { ILinkProps } from '../../commons/Link';
import { IPageLayoutProps } from '../PageLayout.types';
import { ReactNode } from 'react';

export type ISidebarProps = Pick<IPageLayoutProps, 'title'> & {};

export type ISidebarLinkProps = ILinkProps & {
  text: string;
  icon?: ReactNode;
};
