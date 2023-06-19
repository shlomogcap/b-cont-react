import { ReactElement } from 'react';
import { EProjectType } from './ProjectType';
import {
  ProjectsEntrepreneurshipIcon,
  ProjectsPublicSpaceIcon,
  ProjectsResidentialIcon,
} from '../../components/icons';

export const PROJECT_TYPES_ICON_MAPPING: Record<EProjectType, ReactElement> = {
  [EProjectType.Residential]: <ProjectsResidentialIcon />,
  [EProjectType.PublicSpace]: <ProjectsPublicSpaceIcon />,
  [EProjectType.Entrepreneurship]: <ProjectsEntrepreneurshipIcon />,
};
