import { StyledSvgIcon } from './SvgIcon.styled';
import { SIZE_MAP } from './SvgIcon.consts';
import { ISvgIconProps } from './SvgIcon.types';
import { Ref, RefObject, forwardRef } from 'react';

export const SvgIcon = forwardRef(
  (
    { children, size = 'S', ...rest }: ISvgIconProps,
    ref: Ref<SVGSVGElement>,
  ) => {
    return (
      <StyledSvgIcon
        ref={ref}
        width={SIZE_MAP[size]}
        height={SIZE_MAP[size]}
        viewBox='0 0 32 32'
        {...rest}
      >
        {children}
      </StyledSvgIcon>
    );
  },
);
