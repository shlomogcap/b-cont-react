import { CURRENT_COLOR_CLASS_NAME, SvgIcon, ISvgIconProps } from './SvgIcon';

export const ProjectsEntrepreneurshipIcon = (props: ISvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox='0 0 34 32'>
      <path
        className={CURRENT_COLOR_CLASS_NAME}
        d='M32 30v-2h-2v-12h2v-2h-6v2h2v12h-6v-12h2v-2h-6v2h2v12h-6v-12h2v-2h-6v2h2v12h-6v-12h2v-2h-6v2h2v12h-2v2h-2v2h34v-2h-2z'
      />
      <path
        className={CURRENT_COLOR_CLASS_NAME}
        d='M16 0h2l16 10v2h-34v-2l16-10z'
      />
    </SvgIcon>
  );
};
