import { CURRENT_COLOR_CLASS_NAME, SvgIcon, SvgIconProps } from "./SvgIcon";

export const ProjectsResidentialIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox="0 0 32 32">
      <path
        className={CURRENT_COLOR_CLASS_NAME}
        d="M0 32h16v-32h-16v32zM10 4h4v4h-4v-4zM10 12h4v4h-4v-4zM10 20h4v4h-4v-4zM2 4h4v4h-4v-4zM2 12h4v4h-4v-4zM2 20h4v4h-4v-4zM18 10h14v2h-14zM18 32h4v-8h6v8h4v-18h-14z"
      />
    </SvgIcon>
  );
};
