import { StyledFlag } from './Flag.styled';
import { IFlagProps } from './Flag.types';

export const Flag = ({ children, className }: IFlagProps) => {
  return <StyledFlag className={className}>{children}</StyledFlag>;
};
