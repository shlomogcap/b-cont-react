import { CommonFields } from '../consts/commonFields';
import { ProjectFields } from '../consts/projects';
import { ProjectType } from '../consts/projects/ProjectType';

export const MOCK_PROJECTS_DATA = [
  {
    [CommonFields.Id]: '1',
    [ProjectFields.Title]: 'גליל ים',
    [ProjectFields.ProjectType]: ProjectType.Residential,
    [ProjectFields.SDate]: '2023-01-01',
    [ProjectFields.EDate]: '2024-01-01',
    [ProjectFields.TotalAgreementSum]: 200_000_000,
    [ProjectFields.TotalActualsSum]: 150_000_000,
    [ProjectFields.Address]: '',
  },
  {
    [CommonFields.Id]: '2',
    [ProjectFields.Title]: 'ברודצקי',
    [ProjectFields.ProjectType]: ProjectType.Residential,
    [ProjectFields.SDate]: '2023-05-05',
    [ProjectFields.EDate]: '2025-05-05',
    [ProjectFields.TotalAgreementSum]: 200_000_000,
    [ProjectFields.TotalActualsSum]: 150_000_000,
    [ProjectFields.Address]: '',
  },
  {
    [CommonFields.Id]: '3',
    [ProjectFields.Title]: 'רמת גן',
    [ProjectFields.ProjectType]: ProjectType.PublicSpace,
    [ProjectFields.SDate]: '2023-05-05',
    [ProjectFields.EDate]: '2025-05-05',
    [ProjectFields.TotalAgreementSum]: 200_000_000,
    [ProjectFields.TotalActualsSum]: 150_000_000,
    [ProjectFields.Address]: '',
  },
];
