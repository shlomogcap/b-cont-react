import { PropsWithChildren, ReactNode } from 'react';

export type ITooltipProps = PropsWithChildren<{
  content: ReactNode;
  disableTooltip?: boolean;
}>;
