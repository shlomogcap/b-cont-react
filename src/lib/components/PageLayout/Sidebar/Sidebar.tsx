import {
  ProjectsPublicSpaceIcon,
  SettingsIcon,
  ProjectsEntrepreneurshipIcon,
  ProjectsResidentialIcon,
  VendorsIcon,
} from "../../icons";
import { StyledSidebar } from "./Sidebar.styled";
import { SidebarProps } from "./Sidebar.types";
import { SidebarLink } from "./SidebarLink";

const PROJECTS_ROUTE = "/app/projects";
const VERNDORS_ROUTE = "/app/vendors";
const SETTINGS_ROUTE = "/app/settings";

enum ProjectType {
  Residential = "residential",
  PublicSpace = "publicSpace",
  Entrepreneurship = "entrepreneurship",
}

export const Sidebar = ({ title }: SidebarProps) => {
  return (
    <StyledSidebar>
      <nav className="nav">
        <SidebarLink
          text="מגורים"
          href={`${PROJECTS_ROUTE}?projectType=${ProjectType.Residential}`}
          icon={<ProjectsResidentialIcon />}
        />
        <SidebarLink
          text="ציבורי"
          href={`${PROJECTS_ROUTE}?projectType=${ProjectType.PublicSpace}`}
          icon={<ProjectsPublicSpaceIcon />}
        />
        <SidebarLink
          text="יזמות"
          href={`${PROJECTS_ROUTE}?projectType=${ProjectType.Entrepreneurship}`}
          icon={<ProjectsEntrepreneurshipIcon />}
        />
        <div className="hr" />
        <SidebarLink
          text="קבלנים"
          href={VERNDORS_ROUTE}
          icon={<VendorsIcon />}
        />
        <div className="hr" />
        <SidebarLink
          text="הגדרות"
          href={SETTINGS_ROUTE}
          icon={<SettingsIcon />}
        />
      </nav>
      {title}
    </StyledSidebar>
  );
};
