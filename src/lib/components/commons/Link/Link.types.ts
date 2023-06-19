import { LinkProps as INextILinkProps } from 'next/link';
import { ReactNode } from 'react';

export type ILinkProps = INextILinkProps & {
  className?: string;
  children: ReactNode;
};
