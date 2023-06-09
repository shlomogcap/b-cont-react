import { PropsWithChildren } from 'react';
import { StyledBadge } from './Badge.styled';
import { IBadgeProps } from './Badge.types';

export const Badge = ({
  children,
  ...props
}: PropsWithChildren<IBadgeProps>) => {
  return (
    <>
      <StyledBadge {...props}>{children}</StyledBadge>
    </>
  );
};
