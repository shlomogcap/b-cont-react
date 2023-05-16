import { ProjectFields } from '@/lib/consts/projects';
import { IDropdownInputProps } from '../commons/Input/inputs/DropdownInput';
import { validationTexts } from '@/lib/consts/validationTexts';
import Z from 'zod';
import { ProjectType } from '@/lib/consts/projectTypes';
import { ProjectStatus } from '@/lib/consts/projectStatus';
import { ProjectFormValues } from './ProjectForm.types';

export const projectFormSchema = Z.object({
  [ProjectFields.Title]: Z.string({
    required_error: validationTexts.REQUIRED,
  })
    .nonempty(validationTexts.REQUIRED)
    .min(4, validationTexts.TOO_SHORT),
  [ProjectFields.Address]: Z.string().optional(),
  [ProjectFields.SDate]: Z.coerce.date().optional(),
  [ProjectFields.NumberOfPeriods]: Z.coerce
    .number()
    .min(12, validationTexts.TOO_LOW)
    .max(100, validationTexts.TOO_HIGH)
    .optional(),
  [ProjectFields.EDate]: Z.coerce.date().optional(),
  [ProjectFields.Description]: Z.string().optional(),
  [ProjectFields.Manager]: Z.string().optional(),
  [ProjectFields.SeniorManager]: Z.string().optional(),
  [ProjectFields.Executor]: Z.string().optional(),
  [ProjectFields.Entrepreneur]: Z.string().optional(),
  [ProjectFields.ProjectType]: Z.nativeEnum(ProjectType).optional(),
  [ProjectFields.NumberOfBuildings]: Z.coerce
    .number()
    .min(1, validationTexts.TOO_LOW)
    .max(20, validationTexts.TOO_HIGH)
    .optional(),
  [ProjectFields.Basements]: Z.coerce.number().optional(),
  [ProjectFields.NumberOfApatrments]: Z.coerce.number().optional(),
  [ProjectFields.Status]: Z.nativeEnum(ProjectStatus).optional(),
});

export const DUMMY_OPTIONS: IDropdownInputProps['options'] = [
  { text: 'Foo', value: 'foo' },
  { text: 'Bar', value: 'bar' },
  { text: 'Baz', value: 'baz' },
];

export const PROJECT_FORM_DEFAULT_VALUES: ProjectFormValues = {
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
