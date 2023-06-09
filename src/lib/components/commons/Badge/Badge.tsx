import { PropsWithChildren } from 'react';
import { StyledBadge, StyledColumnBadge } from './Badge.styled';
import { IBadgeProps } from './Badge.types';

export const Badge = ({
  children,
  ...props
}: PropsWithChildren<IBadgeProps>) => {
  const { columnBadge } = props;
  return columnBadge ? (
    <StyledColumnBadge {...props}>{children}</StyledColumnBadge>
  ) : (
    <StyledBadge {...props}>{children}</StyledBadge>
  );
};
