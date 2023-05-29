import { ProjectType } from '@/lib/consts/projects/ProjectType';

export type IProjectPageProps = {
  projectType: ProjectType;
  projectId?: string;
};
