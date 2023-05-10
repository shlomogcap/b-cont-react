import { PropsWithChildren, SVGAttributes } from 'react';

export type IIconSize = 'S' | 'M' | 'L' | 'XL';

export type ISvgIconProps = PropsWithChildren<
  SVGAttributes<any> & {
    size?: IIconSize;
  }
>;
