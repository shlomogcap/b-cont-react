import { ProjectFields, ProjectType } from '../../consts/projects';
import { IFilterItemType } from '../commons/FilterPanel';
import Z from 'zod';
import { projectFilterSchema } from './ProjectsPage.consts';

export type IProjectPageProps = {
  projectType: ProjectType;
};

export type IProjectFilterDoc = Z.infer<typeof projectFilterSchema>;
