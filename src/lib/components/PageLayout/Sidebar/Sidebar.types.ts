import { LinkProps } from "next/link";
import { PageLayoutProps } from "../PageLayout.types";
import { ReactNode } from "react";

export type SidebarProps = Pick<PageLayoutProps, "title"> & {};

export type SidebarLinkProps = LinkProps & {
  text: string;
  icon?: ReactNode;
};
