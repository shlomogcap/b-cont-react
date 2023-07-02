import { CURRENT_COLOR_CLASS_NAME, SvgIcon, ISvgIconProps } from './SvgIcon';

export const CopyIcon = (props: ISvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox='0 0 32 32'>
      <path
        className={CURRENT_COLOR_CLASS_NAME}
        d='M20 8v-8h-14l-6 6v18h12v8h20v-24h-12zM6 2.828v3.172h-3.172l3.172-3.172zM2 22v-14h6v-6h10v6l-6 6v8h-10zM18 10.828v3.172h-3.172l3.172-3.172zM30 30h-16v-14h6v-6h10v20z'
      />
    </SvgIcon>
  );
};
