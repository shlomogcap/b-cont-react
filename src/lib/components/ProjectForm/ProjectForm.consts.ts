import { IDropdownInputProps } from '../commons/Input/inputs/DropdownInput';
import { IProjectFormValues } from './ProjectForm.types';
import { EProjectFields } from '@/lib/consts/projects';

export const DUMMY_OPTIONS: IDropdownInputProps['options'] = [
  { text: 'Foo', value: 'foo' },
  { text: 'Bar', value: 'bar' },
  { text: 'Baz', value: 'baz' },
];

export const PROJECT_FORM_DEFAULT_VALUES: IProjectFormValues = {
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
