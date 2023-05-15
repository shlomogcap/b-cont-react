import { CURRENT_COLOR_CLASS_NAME, SvgIcon, ISvgIconProps } from './SvgIcon';

export const AlertIcon = (props: ISvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox='0 0 24 24'>
      <path
        className={CURRENT_COLOR_CLASS_NAME}
        d='M12.984 12.984v-6h-1.969v6h1.969zM12.984 17.016v-2.016h-1.969v2.016h1.969zM12 2.016q4.125 0 7.055 2.93t2.93 7.055-2.93 7.055-7.055 2.93-7.055-2.93-2.93-7.055 2.93-7.055 7.055-2.93z'
      />
    </SvgIcon>
  );
};
