import { ILinkProps } from '../../commons/Link';
import { IPageLayoutProps } from '../PageLayout.types';
import { ReactNode } from 'react';

export type ISidebarProps = Pick<IPageLayoutProps, 'title'> & {};

export type ISidebarLinkProps = Omit<ILinkProps, 'children'> & {
  text: string;
  icon?: ReactNode;
};
