import { ProjectFields, ProjectType } from '../../consts/projects';
import { IFilterItemType } from '../commons/FilterPanel';
import Z from 'zod';
import { projectFilterSchema } from './ProjectsPage.consts';

export type TProjectPageProps = {
  projectType: ProjectType;
};

export type TProjectFilterDoc = Z.infer<typeof projectFilterSchema>;
