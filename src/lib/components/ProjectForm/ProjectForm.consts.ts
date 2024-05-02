import { DefaultValues } from 'react-hook-form';
import { IDropdownInputProps } from '../commons/Input/inputs/DropdownInput';
import { IProjectFormValues } from './ProjectForm.types';
import {
  EProjectFields,
  EProjectStatus,
  PROJECT_DISPLAY_TEXTS,
} from '@/lib/consts/projects';
import { EProjectType } from '@/lib/consts/projects';

export const DUMMY_OPTIONS: IDropdownInputProps['options'] = [
  { text: 'Foo', value: 'foo' },
  { text: 'Bar', value: 'bar' },
  { text: 'Baz', value: 'baz' },
];

export const PROJECT_TYPE_OPTIONS: IDropdownInputProps['options'] = [
  {
    text: PROJECT_DISPLAY_TEXTS.he.projectTypes[EProjectType.Entrepreneurship],
    value: EProjectType.Entrepreneurship,
  },
  {
    text: PROJECT_DISPLAY_TEXTS.he.projectTypes[EProjectType.PublicSpace],
    value: EProjectType.PublicSpace,
  },
  {
    text: PROJECT_DISPLAY_TEXTS.he.projectTypes[EProjectType.Residential],
    value: EProjectType.Residential,
  },
];

export const PROJECT_STATUS_OPTIONS: IDropdownInputProps['options'] = [
  {
    text: PROJECT_DISPLAY_TEXTS.he.projectStatus[EProjectStatus.Active],
    value: EProjectStatus.Active,
  },
  {
    text: PROJECT_DISPLAY_TEXTS.he.projectStatus[EProjectStatus.NonActive],
    value: EProjectStatus.NonActive,
  },
];

export const PROJECT_FORM_DEFAULT_VALUES: DefaultValues<IProjectFormValues> = {
  [EProjectFields.Title]: '',
  [EProjectFields.Address]: '',
  // [ProjectFields.SDate]: '',
  [EProjectFields.NumberOfPeriods]: 0,
  // [ProjectFields.EDate]:'',
  [EProjectFields.Description]: '',
  [EProjectFields.Manager]: '',
  [EProjectFields.SeniorManager]: '',
  [EProjectFields.Executor]: '',
  [EProjectFields.Entrepreneur]: '',
  // [ProjectFields.ProjectType]: '',
  [EProjectFields.NumberOfBuildings]: 0,
  [EProjectFields.Basements]: 0,
  [EProjectFields.NumberOfApatrments]: 0,
  // [ProjectFields.Status]: '',
};
