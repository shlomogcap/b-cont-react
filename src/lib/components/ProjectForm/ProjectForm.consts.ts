import { CommonFields } from '@/lib/consts/commonFields';
import { IDropdownInputProps } from '../commons/Input/inputs/DropdownInput';
import { IProjectFormValues } from './ProjectForm.types';
import { ProjectFields } from '@/lib/consts/projects';

export const DUMMY_OPTIONS: IDropdownInputProps['options'] = [
  { text: 'Foo', value: 'foo' },
  { text: 'Bar', value: 'bar' },
  { text: 'Baz', value: 'baz' },
];

export const PROJECT_FORM_DEFAULT_VALUES: IProjectFormValues = {
  [ProjectFields.Title]: '',
  [ProjectFields.Address]: '',
  // [ProjectFields.SDate]: '',
  [ProjectFields.NumberOfPeriods]: 0,
  // [ProjectFields.EDate]:'',
  [ProjectFields.Description]: '',
  [ProjectFields.Manager]: '',
  [ProjectFields.SeniorManager]: '',
  [ProjectFields.Executor]: '',
  [ProjectFields.Entrepreneur]: '',
  // [ProjectFields.ProjectType]: '',
  [ProjectFields.NumberOfBuildings]: 0,
  [ProjectFields.Basements]: 0,
  [ProjectFields.NumberOfApatrments]: 0,
  // [ProjectFields.Status]: '',
};
