import { PropsWithChildren, ReactNode } from 'react';

export type TTooltipProps = PropsWithChildren<{
  content: ReactNode;
  disableTooltip?: boolean;
}>;
