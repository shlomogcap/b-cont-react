import { ILinkProps } from '../../commons/Link';
import { IPageLayoutProps } from '../PageLayout.types';
import { ReactNode } from 'react';

export type TSidebarProps = Pick<IPageLayoutProps, 'title'> & {};

export type TSidebarLinkProps = Omit<ILinkProps, 'children'> & {
  text: string;
  icon?: ReactNode;
};
