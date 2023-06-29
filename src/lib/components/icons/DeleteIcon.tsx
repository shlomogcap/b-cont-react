import { CURRENT_COLOR_CLASS_NAME, SvgIcon, ISvgIconProps } from './SvgIcon';

export const DeleteIcon = (props: ISvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox='0 0 20 20'>
      <path
        className={CURRENT_COLOR_CLASS_NAME}
        d='M6 2l2-2h4l2 2h4v2h-16v-2h4zM3 6h14l-1 14h-12l-1-14zM8 8v10h1v-10h-1zM11 8v10h1v-10h-1z'
      />
    </SvgIcon>
  );
};
