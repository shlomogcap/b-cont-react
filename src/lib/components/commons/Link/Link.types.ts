import { LinkProps as INextILinkProps } from 'next/link';
import { ReactNode } from 'react';

export type TLinkProps = INextILinkProps & {
  className?: string;
  children: ReactNode;
};
