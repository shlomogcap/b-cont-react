import { ReactElement, ReactNode } from 'react';
import { ProjectType } from './projectTypes';
import {
  ProjectsEntrepreneurshipIcon,
  ProjectsPublicSpaceIcon,
  ProjectsResidentialIcon,
} from '../components/icons';

export const PROJECT_TYPES_ICON_MAPPING: Record<ProjectType, ReactElement> = {
  [ProjectType.Residential]: <ProjectsResidentialIcon />,
  [ProjectType.PublicSpace]: <ProjectsPublicSpaceIcon />,
  [ProjectType.Entrepreneurship]: <ProjectsEntrepreneurshipIcon />,
};
