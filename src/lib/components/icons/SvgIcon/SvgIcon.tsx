import { StyledSvgIcon } from './SvgIcon.styled';
import { SIZE_MAP } from './SvgIcon.consts';
import { ISvgIconProps } from './SvgIcon.types';

export const SvgIcon = ({ children, size = 'S', ...rest }: ISvgIconProps) => {
  return (
    <StyledSvgIcon
      width={SIZE_MAP[size]}
      height={SIZE_MAP[size]}
      viewBox='0 0 32 32'
      {...rest}
    >
      {children}
    </StyledSvgIcon>
  );
};
