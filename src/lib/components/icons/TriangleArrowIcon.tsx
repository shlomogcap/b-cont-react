import { CURRENT_COLOR_CLASS_NAME, SvgIcon, ISvgIconProps } from './SvgIcon';

type TTriangleArrowIconDirection = 'down' | 'left' | 'right' | 'up';

type TTriangleArrowIconProps = ISvgIconProps & {
  direction: ITriangleArrowIconDirection;
};

const ICON_DIRECTION_PATH: Record<ITriangleArrowIconDirection, string> = {
  down: 'M5 6h10l-5 9-5-9z',
  left: 'M14 5v10l-9-5 9-5z',
  right: 'M15 10l-9 5v-10l9 5z',
  up: 'M15 14h-10l5-9 5 9z',
};

export const TriangleArrowIcon = ({
  direction,
  ...iconProps
}: ITriangleArrowIconProps) => {
  return (
    <SvgIcon {...iconProps} viewBox='0 0 20 20'>
      <path
        className={CURRENT_COLOR_CLASS_NAME}
        d={ICON_DIRECTION_PATH[direction]}
      />
    </SvgIcon>
  );
};
