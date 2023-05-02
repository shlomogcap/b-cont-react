import { CURRENT_COLOR_CLASS_NAME, SvgIcon, SvgIconProps } from './SvgIcon';

export const VendorsIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox='0 0 32 28'>
      <path
        className={CURRENT_COLOR_CLASS_NAME}
        d='M14 18.937c0 1.141-0.75 2.063-1.672 2.063h-6.656c-0.922 0-1.672-0.922-1.672-2.063 0-2.063 0.5-4.438 2.562-4.438 0.625 0.625 1.484 1 2.438 1s1.813-0.375 2.438-1c2.063 0 2.562 2.375 2.562 4.438zM12 12c0 1.656-1.344 3-3 3s-3-1.344-3-3 1.344-3 3-3 3 1.344 3 3zM28 18.5v1c0 0.281-0.219 0.5-0.5 0.5h-11c-0.281 0-0.5-0.219-0.5-0.5v-1c0-0.281 0.219-0.5 0.5-0.5h11c0.281 0 0.5 0.219 0.5 0.5zM22 14.5v1c0 0.281-0.219 0.5-0.5 0.5h-5c-0.281 0-0.5-0.219-0.5-0.5v-1c0-0.281 0.219-0.5 0.5-0.5h5c0.281 0 0.5 0.219 0.5 0.5zM28 14.5v1c0 0.281-0.219 0.5-0.5 0.5h-3c-0.281 0-0.5-0.219-0.5-0.5v-1c0-0.281 0.219-0.5 0.5-0.5h3c0.281 0 0.5 0.219 0.5 0.5zM28 10.5v1c0 0.281-0.219 0.5-0.5 0.5h-11c-0.281 0-0.5-0.219-0.5-0.5v-1c0-0.281 0.219-0.5 0.5-0.5h11c0.281 0 0.5 0.219 0.5 0.5zM30 23.5v-17.5h-28v17.5c0 0.266 0.234 0.5 0.5 0.5h27c0.266 0 0.5-0.234 0.5-0.5zM32 4.5v19c0 1.375-1.125 2.5-2.5 2.5h-27c-1.375 0-2.5-1.125-2.5-2.5v-19c0-1.375 1.125-2.5 2.5-2.5h27c1.375 0 2.5 1.125 2.5 2.5z'
      />
    </SvgIcon>
  );
};
