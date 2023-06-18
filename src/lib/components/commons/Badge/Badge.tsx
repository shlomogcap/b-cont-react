import { PropsWithChildren } from 'react';
import { StyledBadge, StyledColumnBadge } from './Badge.styled';
import { IBadgeProps } from './Badge.types';

export const Badge = ({ columnBadge }: PropsWithChildren<IBadgeProps>) => {
  return columnBadge ? <StyledColumnBadge /> : <StyledBadge />;
};
