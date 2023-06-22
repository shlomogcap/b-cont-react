import { ProjectFields, ProjectType } from '../../consts/projects';
import { IFilterItemType } from '../commons/FilterPanel';
import { z } from 'zod';
import { projectFilterSchema } from './ProjectsPage.consts';

export type IProjectPageProps = {
  projectType: ProjectType;
};

export type IProjectFilterDoc = z.infer<typeof projectFilterSchema>;
