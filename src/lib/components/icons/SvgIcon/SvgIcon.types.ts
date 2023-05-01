import { PropsWithChildren, SVGAttributes } from "react";

export type IconSize = "S" | "M" | "L" | "XL";

export type SvgIconProps = PropsWithChildren<
  SVGAttributes<any> & {
    size?: IconSize;
  }
>;
