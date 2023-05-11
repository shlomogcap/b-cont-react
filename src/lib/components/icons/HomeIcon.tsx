import { CURRENT_COLOR_CLASS_NAME, SvgIcon, ISvgIconProps } from './SvgIcon';

export const HomeIcon = (props: ISvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox='0 0 24 24'>
      <path
        className={CURRENT_COLOR_CLASS_NAME}
        d='M22.262 10.468c-3.39-2.854-9.546-8.171-9.607-8.225l-0.655-0.563-0.652 0.563c-0.062 0.053-6.221 5.368-9.66 8.248-0.438 0.394-0.688 0.945-0.688 1.509 0 1.104 0.896 2 2 2h1v6c0 1.104 0.896 2 2 2h12c1.104 0 2-0.896 2-2v-6h1c1.104 0 2-0.896 2-2 0-0.598-0.275-1.161-0.738-1.532zM14 20h-4v-5h4v5zM18 12l0.002 8c-0.002 0-3.002 0-3.002 0v-6h-6v6h-3v-8h-3.001c2.765-2.312 7.315-6.227 9.001-7.68 1.686 1.453 6.234 5.367 9 7.681 0 0-3 0-3-0.001z'
      />
    </SvgIcon>
  );
};
