import { CURRENT_COLOR_CLASS_NAME, SvgIcon, ISvgIconProps } from './SvgIcon';

export const SettingsIcon = (props: ISvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox='0 0 20 20'>
      <path
        className={CURRENT_COLOR_CLASS_NAME}
        d='M16.783 10c0-1.049 0.646-1.875 1.617-2.443-0.176-0.584-0.407-1.145-0.692-1.672-1.089 0.285-1.97-0.141-2.711-0.883-0.741-0.74-0.968-1.621-0.683-2.711-0.527-0.285-1.088-0.518-1.672-0.691-0.568 0.97-1.595 1.615-2.642 1.615-1.048 0-2.074-0.645-2.643-1.615-0.585 0.173-1.144 0.406-1.671 0.691 0.285 1.090 0.059 1.971-0.684 2.711-0.74 0.742-1.621 1.168-2.711 0.883-0.285 0.527-0.517 1.088-0.691 1.672 0.97 0.568 1.615 1.394 1.615 2.443 0 1.047-0.645 2.074-1.615 2.643 0.175 0.584 0.406 1.144 0.691 1.672 1.090-0.285 1.971-0.059 2.711 0.682s0.969 1.623 0.684 2.711c0.527 0.285 1.087 0.518 1.672 0.693 0.568-0.973 1.595-1.617 2.643-1.617 1.047 0 2.074 0.645 2.643 1.617 0.584-0.176 1.144-0.408 1.672-0.693-0.285-1.088-0.059-1.969 0.683-2.711 0.741-0.74 1.622-1.166 2.711-0.883 0.285-0.527 0.517-1.086 0.692-1.672-0.973-0.569-1.619-1.395-1.619-2.442zM10 13.652c-2.018 0-3.653-1.635-3.653-3.652 0-2.018 1.636-3.654 3.653-3.654s3.652 1.637 3.652 3.654c0 2.018-1.634 3.652-3.652 3.652z'
      />
    </SvgIcon>
  );
};
