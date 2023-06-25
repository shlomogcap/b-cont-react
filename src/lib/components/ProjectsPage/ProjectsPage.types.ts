import { z } from 'zod';
import { EProjectType } from '../../consts/projects';
import { projectFilterSchema } from './ProjectsPage.consts';

export type IProjectPageProps = {
  projectType: EProjectType;
};

export type IProjectFilterDoc = z.infer<typeof projectFilterSchema>;
