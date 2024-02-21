import { PropsWithChildren } from 'react';
import { IButtonProps } from './Button.types';
import { StyledButton } from './Button.styled';
import { SIZE_MAP } from './Button.consts';

export const Button = ({
  children,
  ...props
}: PropsWithChildren<IButtonProps>) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};
