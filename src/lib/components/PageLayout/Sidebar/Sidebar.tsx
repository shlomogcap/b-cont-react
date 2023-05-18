import { PROJECT_DISPLAY_TEXTS } from '@/lib/consts/projects';
import { ProjectType } from '../../../consts/projects/ProjectType';
import { Routes } from '../../../consts/Routes';
import {
  ProjectsPublicSpaceIcon,
  SettingsIcon,
  ProjectsEntrepreneurshipIcon,
  ProjectsResidentialIcon,
  VendorsIcon,
} from '../../icons';
import { StyledSidebar } from './Sidebar.styled';
import { ISidebarProps } from './Sidebar.types';
import { SidebarLink } from './SidebarLink';

export const Sidebar = ({ title }: ISidebarProps) => {
  const projectTypeTexts = PROJECT_DISPLAY_TEXTS.he.projectTypes;
  return (
    <StyledSidebar>
      <nav className='nav'>
        <SidebarLink
          text={projectTypeTexts[ProjectType.Residential]}
          href={`${Routes.Projects}/${ProjectType.Residential}`}
          icon={<ProjectsResidentialIcon />}
        />
        <SidebarLink
          text={projectTypeTexts[ProjectType.PublicSpace]}
          href={`${Routes.Projects}/${ProjectType.PublicSpace}`}
          icon={<ProjectsPublicSpaceIcon />}
        />
        <SidebarLink
          text={projectTypeTexts[ProjectType.Entrepreneurship]}
          href={`${Routes.Projects}/${ProjectType.Entrepreneurship}`}
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
