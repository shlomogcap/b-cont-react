import { CURRENT_COLOR_CLASS_NAME, SvgIcon, ISvgIconProps } from './SvgIcon';

type IArrowIconDirection = 'left' | 'right';

type IArrowIconProps = ISvgIconProps & {
  direction: IArrowIconDirection;
};

const ICON_DIRECTION_PATH: Record<IArrowIconDirection, string> = {
  left: 'M1 16l15 15v-9h16v-12h-16v-9z',
  right: 'M31 16l-15-15v9h-16v12h16v9z',
};

export const ArrowIcon = ({ direction, ...iconProps }: IArrowIconProps) => {
  return (
    <SvgIcon {...iconProps} viewBox='0 0 32 32'>
      <path
        className={CURRENT_COLOR_CLASS_NAME}
        d={ICON_DIRECTION_PATH[direction]}
      />
    </SvgIcon>
  );
};
