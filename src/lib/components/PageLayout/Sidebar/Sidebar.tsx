import { PROJECT_DISPLAY_TEXTS } from '@/lib/consts/projects';
import { EProjectType } from '../../../consts/projects/ProjectType';
import { ERoutesNames, PROJECT_TYPE_QUERY } from '../../../consts/routes';
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
import { DISPLAY_TEXTS } from '@/lib/consts/displayTexts';

export const Sidebar = ({ title }: ISidebarProps) => {
  const projectTypeTexts = PROJECT_DISPLAY_TEXTS.he.projectTypes;
  return (
    <StyledSidebar>
      <nav className='nav'>
        <SidebarLink
          text={projectTypeTexts[EProjectType.Residential]}
          href={ERoutesNames.ProjectsWithType.replace(
            `[${PROJECT_TYPE_QUERY}]`,
            EProjectType.Residential,
          )}
          icon={<ProjectsResidentialIcon />}
        />
        <SidebarLink
          text={projectTypeTexts[EProjectType.PublicSpace]}
          href={ERoutesNames.ProjectsWithType.replace(
            `[${PROJECT_TYPE_QUERY}]`,
            EProjectType.PublicSpace,
          )}
          icon={<ProjectsPublicSpaceIcon />}
        />
        <SidebarLink
          text={projectTypeTexts[EProjectType.Entrepreneurship]}
          href={ERoutesNames.ProjectsWithType.replace(
            `[${PROJECT_TYPE_QUERY}]`,
            EProjectType.Entrepreneurship,
          )}
          icon={<ProjectsEntrepreneurshipIcon />}
        />
        <div className='hr' />
        <SidebarLink
          text={DISPLAY_TEXTS.he.routeNames[ERoutesNames.Vendors]}
          href={ERoutesNames.Vendors}
          icon={<VendorsIcon />}
        />
        <div className='hr' />
        <SidebarLink
          text={DISPLAY_TEXTS.he.routeNames[ERoutesNames.Settings]}
          href={ERoutesNames.Settings}
          icon={<SettingsIcon />}
        />
      </nav>
      {title}
    </StyledSidebar>
  );
};
