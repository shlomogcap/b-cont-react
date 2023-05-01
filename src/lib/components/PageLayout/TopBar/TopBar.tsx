import { Breadcrumbs } from "../Breadcrubms/Breadcrumbs";
import { StyledTopBar } from "./TopBar.styled";
import { TopBarProps } from "./TopBar.types";

export const TopBar = ({ title }: TopBarProps) => {
  return (
    <StyledTopBar>
      <div className="logo"></div>
      <div className="title">{title}</div>
      <div className="user-box">SG</div>
      <Breadcrumbs />
    </StyledTopBar>
  );
};
