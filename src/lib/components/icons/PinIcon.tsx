import { CURRENT_COLOR_CLASS_NAME, SvgIcon, ISvgIconProps } from './SvgIcon';

export const PinIcon = (props: ISvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox='0 0 20 20'>
      <path
        className={CURRENT_COLOR_CLASS_NAME}
        d='M11 12h6v-1l-3-1v-8l3-1v-1h-14v1l3 1v8l-3 1v1h6v7l1 1 1-1v-7z'
      />
    </SvgIcon>
  );
};
