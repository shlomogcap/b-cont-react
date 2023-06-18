import { Ref, forwardRef } from 'react';
import { CURRENT_COLOR_CLASS_NAME, SvgIcon, ISvgIconProps } from './SvgIcon';
import { POINTER_CURSOR_CLASS_NAME } from './SvgIcon/SvgIcon.consts';

export const FilterIconClose = forwardRef(
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
          d='M19.845 4l-6.609 7.814c-0.147 0.173-0.236 0.399-0.236 0.646v6.922l-2-1v-5.922c0.001-0.227-0.077-0.457-0.236-0.646l-6.609-7.814zM22 2h-20c-0.552 0-1 0.448-1 1 0 0.247 0.089 0.473 0.236 0.646l7.764 9.18v6.174c0 0.389 0.222 0.727 0.553 0.894l4 2c0.494 0.247 1.095 0.047 1.342-0.447 0.072-0.146 0.106-0.301 0.105-0.447v-8.174l7.764-9.18c0.357-0.422 0.304-1.053-0.118-1.409-0.189-0.16-0.419-0.238-0.646-0.237z'
        />
      </SvgIcon>
    );
  },
);
