import { DISPLAY_TEXTS } from '../../consts/displayTexts';
import { ProjectType } from '../../consts/projectTypes';
import { Routes } from '../../consts/routes';
import {
  ProjectsPublicSpaceIcon,
  SettingsIcon,
  ProjectsEntrepreneurshipIcon,
  ProjectsResidentialIcon,
  VendorsIcon,
} from '../../icons';
import { StyledSidebar } from './Sidebar.styled';
import { SidebarProps } from './Sidebar.types';
import { SidebarLink } from './SidebarLink';

const PROJECT_TYPE_PARAM = 'projectType';

export const Sidebar = ({ title }: SidebarProps) => {
  const projectTypeTexts = DISPLAY_TEXTS.he.projectType;
  return (
    <StyledSidebar>
      <nav className='nav'>
        <SidebarLink
          text={projectTypeTexts[ProjectType.Residential]}
          href={`${Routes.Projects}?${PROJECT_TYPE_PARAM}=${ProjectType.Residential}`}
          icon={<ProjectsResidentialIcon />}
        />
        <SidebarLink
          text={projectTypeTexts[ProjectType.PublicSpace]}
          href={`${Routes.Projects}?${PROJECT_TYPE_PARAM}=${ProjectType.PublicSpace}`}
          icon={<ProjectsPublicSpaceIcon />}
        />
        <SidebarLink
          text={projectTypeTexts[ProjectType.Entrepreneurship]}
          href={`${Routes.Projects}?${PROJECT_TYPE_PARAM}=${ProjectType.Entrepreneurship}`}
          icon={<ProjectsEntrepreneurshipIcon />}
        />
        <div className='hr' />
        <SidebarLink
          text='קבלנים'
          href={Routes.Vendors}
          icon={<VendorsIcon />}
        />
        <div className='hr' />
        <SidebarLink
          text='הגדרות'
          href={Routes.Settings}
          icon={<SettingsIcon />}
        />
      </nav>
      {title}
    </StyledSidebar>
  );
};
