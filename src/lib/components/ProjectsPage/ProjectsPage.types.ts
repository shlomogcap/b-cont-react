import { ProjectType } from '../../consts/projects';

export type IProjectPageProps = {
  projectType: ProjectType;
};

export type IProjectFilterDoc = {
  status: string[];
  sDate: { from: Date | string; to: Date | string };
  eDate: { from: Date | string; to: Date | string };
};
