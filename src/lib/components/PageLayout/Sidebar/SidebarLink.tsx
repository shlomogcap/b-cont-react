import { useRouter } from "next/router";
import { StyledSidebarLink } from "./Sidebar.styled";
import { SidebarLinkProps } from "./Sidebar.types";
import { Tooltip } from "../../commons/Tooltip/Tooltip";

export const SidebarLink = ({ text, href, icon }: SidebarLinkProps) => {
  const { asPath } = useRouter();
  const isActive = asPath === href;
  return (
    <Tooltip content={text}>
      <StyledSidebarLink href={href} className={`${isActive ? "active" : ""}`}>
        {icon}
        <div className="text">{text}</div>
      </StyledSidebarLink>
    </Tooltip>
  );
};
