import { ID_FIELD, ProjectFields } from '../consts/project';
import { ProjectType } from '../consts/projectTypes';

export const MOCK_PROJECTS_DATA = [
  {
    [ID_FIELD]: '1',
    [ProjectFields.Title]: 'גליל ים',
    [ProjectFields.SDate]: '2023-01-01',
    [ProjectFields.EDate]: '2024-01-01',
    [ProjectFields.ProjectType]: ProjectType.Residential,
  },
  {
    [ID_FIELD]: '2',
    [ProjectFields.Title]: 'ברודצקי',
    [ProjectFields.SDate]: '2023-05-05',
    [ProjectFields.EDate]: '2025-05-05',
    [ProjectFields.ProjectType]: ProjectType.Residential,
  },
  {
    [ID_FIELD]: '3',
    [ProjectFields.Title]: 'רמת גן',
    [ProjectFields.SDate]: '2023-05-05',
    [ProjectFields.EDate]: '2025-05-05',
    [ProjectFields.ProjectType]: ProjectType.PublicSpace,
  },
];
