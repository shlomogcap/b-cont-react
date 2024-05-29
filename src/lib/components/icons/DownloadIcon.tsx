import { Ref, forwardRef } from 'react';
import { CURRENT_COLOR_CLASS_NAME, SvgIcon, ISvgIconProps } from './SvgIcon';
import { POINTER_CURSOR_CLASS_NAME } from './SvgIcon/SvgIcon.consts';

const DownloadIconContent = (
  props: ISvgIconProps,
  ref?: Ref<SVGSVGElement>,
) => {
  return (
    <SvgIcon
      ref={ref}
      {...props}
      viewBox='0 0 20 20'
      className={POINTER_CURSOR_CLASS_NAME}
    >
      <path
        className={CURRENT_COLOR_CLASS_NAME}
        d='M13 8v-6h-6v6h-5l8 8 8-8h-5zM0 18h20v2h-20v-2z'
      />
    </SvgIcon>
  );
};

export const DownloadIcon = forwardRef(DownloadIconContent);
