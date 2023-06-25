import { EProjectFields, EProjectType } from '../../consts/projects';
import { EFilterItemType } from '../commons/FilterPanel';
import Z from 'zod';
import { projectFilterSchema } from './ProjectsPage.consts';

export type IProjectPageProps = {
  projectType: EProjectType;
};

export type IProjectFilterDoc = Z.infer<typeof projectFilterSchema>;
