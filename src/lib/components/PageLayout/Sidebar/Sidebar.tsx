import { PROJECT_DISPLAY_TEXTS } from '@/lib/consts/projects';
import { ProjectType } from '../../../consts/projects/ProjectType';
import { IRoutesNames, PROJECT_TYPE_QUERY } from '../../../consts/routes';
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
          href={IRoutesNames.ProjectsWithType.replace(
            `[${PROJECT_TYPE_QUERY}]`,
            ProjectType.Residential,
          )}
          icon={<ProjectsResidentialIcon />}
        />
        <SidebarLink
          text={projectTypeTexts[ProjectType.PublicSpace]}
          href={IRoutesNames.ProjectsWithType.replace(
            `[${PROJECT_TYPE_QUERY}]`,
            ProjectType.PublicSpace,
          )}
          icon={<ProjectsPublicSpaceIcon />}
        />
        <SidebarLink
          text={projectTypeTexts[ProjectType.Entrepreneurship]}
          href={IRoutesNames.ProjectsWithType.replace(
            `[${PROJECT_TYPE_QUERY}]`,
            ProjectType.Entrepreneurship,
          )}
          icon={<ProjectsEntrepreneurshipIcon />}
        />
        <div className='hr' />
        <SidebarLink
          text='קבלנים'
          href={IRoutesNames.Vendors}
          icon={<VendorsIcon />}
        />
        <div className='hr' />
        <SidebarLink
          text='הגדרות'
          href={IRoutesNames.Settings}
          icon={<SettingsIcon />}
        />
      </nav>
      {title}
    </StyledSidebar>
  );
};
