import { PropsWithChildren, SVGAttributes } from 'react';

export type TIconSize = 'S' | 'M' | 'L' | 'XL';

export type TSvgIconProps = PropsWithChildren<
  SVGAttributes<any> & {
    size?: IIconSize;
  }
>;
