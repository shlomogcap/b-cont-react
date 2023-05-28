import { CURRENT_COLOR_CLASS_NAME, SvgIcon, ISvgIconProps } from './SvgIcon';

export const FilterIcon = (props: ISvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox='0 0 22 28'>
      <path
        className={CURRENT_COLOR_CLASS_NAME}
        d={
          props.isActive
            ? 'M21.922 4.609c0.156 0.375 0.078 0.812-0.219 1.094l-7.703 7.703v11.594c0 0.406-0.25 0.766-0.609 0.922-0.125 0.047-0.266 0.078-0.391 0.078-0.266 0-0.516-0.094-0.703-0.297l-4-4c-0.187-0.187-0.297-0.438-0.297-0.703v-7.594l-7.703-7.703c-0.297-0.281-0.375-0.719-0.219-1.094 0.156-0.359 0.516-0.609 0.922-0.609h20c0.406 0 0.766 0.25 0.922 0.609z'
            : 'M19.845 4l-6.609 7.814c-0.147 0.173-0.236 0.399-0.236 0.646v6.922l-2-1v-5.922c0.001-0.227-0.077-0.457-0.236-0.646l-6.609-7.814zM22 2h-20c-0.552 0-1 0.448-1 1 0 0.247 0.089 0.473 0.236 0.646l7.764 9.18v6.174c0 0.389 0.222 0.727 0.553 0.894l4 2c0.494 0.247 1.095 0.047 1.342-0.447 0.072-0.146 0.106-0.301 0.105-0.447v-8.174l7.764-9.18c0.357-0.422 0.304-1.053-0.118-1.409-0.189-0.16-0.419-0.238-0.646-0.237z'
        }
      />
    </SvgIcon>
  );
};