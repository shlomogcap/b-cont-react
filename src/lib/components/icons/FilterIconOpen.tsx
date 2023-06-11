import { Ref, forwardRef } from 'react';
import { CURRENT_COLOR_CLASS_NAME, SvgIcon, ISvgIconProps } from './SvgIcon';
import { POINTER_CURSOR_CLASS_NAME } from './SvgIcon/SvgIcon.consts';
import { Badge } from '../commons/Badge';

export const FilterIconOpen = forwardRef(
  (props: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
    return (
      <SvgIcon
        ref={ref}
        {...props}
        viewBox='0 0 22 28'
        className={POINTER_CURSOR_CLASS_NAME}
      >
        <path
          className={CURRENT_COLOR_CLASS_NAME}
          d='M21.922 4.609c0.156 0.375 0.078 0.812-0.219 1.094l-7.703 7.703v11.594c0 0.406-0.25 0.766-0.609 0.922-0.125 0.047-0.266 0.078-0.391 0.078-0.266 0-0.516-0.094-0.703-0.297l-4-4c-0.187-0.187-0.297-0.438-0.297-0.703v-7.594l-7.703-7.703c-0.297-0.281-0.375-0.719-0.219-1.094 0.156-0.359 0.516-0.609 0.922-0.609h20c0.406 0 0.766 0.25 0.922 0.609z'
        />
      </SvgIcon>
    );
  },
);
