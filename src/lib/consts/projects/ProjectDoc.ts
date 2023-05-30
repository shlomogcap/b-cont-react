import Z from 'zod';
import { WithIdField } from '@/lib/utils/WithIdField';
import { ProjectFields } from './ProjectFields';
import { ProjectType } from './ProjectType';
import { ProjectStatus } from './ProjectStatus';
import {
  OPTIONAL_DATE_SCHEMA,
  OPTIONAL_NUMBER_SCHEMA,
  OPTIONAL_STRING_SCHEMA,
  TITLE_FIELD_SCHEMA,
} from '../validation/validationSchema';
import {
  IErrorMessage,
  VALIDATION_DISPLAY_TEXTS,
} from '../validation/displayTexts';

export const ProjectDoc = Z.object({
  [ProjectFields.Title]: TITLE_FIELD_SCHEMA,
  [ProjectFields.Address]: OPTIONAL_STRING_SCHEMA,
  [ProjectFields.SDate]: OPTIONAL_DATE_SCHEMA,
  [ProjectFields.NumberOfPeriods]: Z.coerce
    .number()
    .min(12, VALIDATION_DISPLAY_TEXTS.he.errosMessages[IErrorMessage.TooLow])
    .max(100, VALIDATION_DISPLAY_TEXTS.he.errosMessages[IErrorMessage.TooHigh])
    .optional(),
  [ProjectFields.EDate]: OPTIONAL_DATE_SCHEMA,
  [ProjectFields.Description]: OPTIONAL_STRING_SCHEMA,
  [ProjectFields.Manager]: OPTIONAL_STRING_SCHEMA,
  [ProjectFields.SeniorManager]: OPTIONAL_STRING_SCHEMA,
  [ProjectFields.Executor]: OPTIONAL_STRING_SCHEMA,
  [ProjectFields.Entrepreneur]: OPTIONAL_STRING_SCHEMA,
  [ProjectFields.ProjectType]: Z.nativeEnum(ProjectType).optional(),
  [ProjectFields.NumberOfBuildings]: Z.coerce
    .number()
    .min(1, VALIDATION_DISPLAY_TEXTS.he.errosMessages[IErrorMessage.TooLow])
    .max(20, VALIDATION_DISPLAY_TEXTS.he.errosMessages[IErrorMessage.TooHigh])
    .optional(),
  [ProjectFields.Basements]: OPTIONAL_NUMBER_SCHEMA,
  [ProjectFields.NumberOfApatrments]: OPTIONAL_NUMBER_SCHEMA,
  [ProjectFields.Status]: Z.nativeEnum(ProjectStatus).optional(),
});

export type IProjectDoc = WithIdField<Z.infer<typeof ProjectDoc>>;
