import { ReactNode } from 'react';
import { ProjectType } from './projectTypes';
import {
  ProjectsEntrepreneurshipIcon,
  ProjectsPublicSpaceIcon,
  ProjectsResidentialIcon,
} from '../icons';

export const PROJECT_TYPES_ICON_MAPPING: Record<ProjectType, ReactNode> = {
  [ProjectType.Residential]: <ProjectsResidentialIcon />,
  [ProjectType.PublicSpace]: <ProjectsPublicSpaceIcon />,
  [ProjectType.Entrepreneurship]: <ProjectsEntrepreneurshipIcon />,
};
