import { ProjectFields, ProjectType } from '../../consts/projects';

export type IProjectPageProps = {
  projectType: ProjectType;
};

export type IProjectFilterDoc = {
  [ProjectFields.Status]: string[];
  [ProjectFields.SDate]: { from: Date | string; to: Date | string };
  [ProjectFields.EDate]: { from: Date | string; to: Date | string };
};
