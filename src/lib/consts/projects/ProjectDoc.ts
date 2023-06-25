import Z, { ZodType } from 'zod';
import { IWithCommonFields } from '@/lib/utils/WithFields';
import { EProjectFields } from './ProjectFields';
import { EProjectType } from './ProjectType';
import { EProjectStatus } from './ProjectStatus';
import {
  OPTIONAL_DATE_SCHEMA,
  OPTIONAL_NUMBER_SCHEMA,
  OPTIONAL_STRING_SCHEMA,
  TITLE_FIELD_SCHEMA,
} from '../validation/validationSchema';
import {
  EErrorMessage,
  VALIDATION_DISPLAY_TEXTS,
} from '../validation/displayTexts';

export const ProjectDoc = Z.object({
  [EProjectFields.Title]: TITLE_FIELD_SCHEMA,
  [EProjectFields.Address]: OPTIONAL_STRING_SCHEMA,
  [EProjectFields.SDate]: OPTIONAL_DATE_SCHEMA,
  [EProjectFields.NumberOfPeriods]: Z.coerce
    .number()
    .min(12, VALIDATION_DISPLAY_TEXTS.he.errosMessages[EErrorMessage.TooLow])
    .max(100, VALIDATION_DISPLAY_TEXTS.he.errosMessages[EErrorMessage.TooHigh])
    .optional(),
  [EProjectFields.EDate]: OPTIONAL_DATE_SCHEMA,
  [EProjectFields.Description]: OPTIONAL_STRING_SCHEMA,
  [EProjectFields.Manager]: OPTIONAL_STRING_SCHEMA,
  [EProjectFields.SeniorManager]: OPTIONAL_STRING_SCHEMA,
  [EProjectFields.Executor]: OPTIONAL_STRING_SCHEMA,
  [EProjectFields.Entrepreneur]: OPTIONAL_STRING_SCHEMA,
  [EProjectFields.ProjectType]: Z.nativeEnum(EProjectType).optional(),
  [EProjectFields.NumberOfBuildings]: Z.coerce
    .number()
    .min(1, VALIDATION_DISPLAY_TEXTS.he.errosMessages[EErrorMessage.TooLow])
    .max(20, VALIDATION_DISPLAY_TEXTS.he.errosMessages[EErrorMessage.TooHigh])
    .optional(),
  [EProjectFields.Basements]: OPTIONAL_NUMBER_SCHEMA,
  [EProjectFields.NumberOfApatrments]: OPTIONAL_NUMBER_SCHEMA,
  [EProjectFields.Status]: Z.nativeEnum(EProjectStatus).optional(),
});

export type IProjectDoc = IWithCommonFields<Z.infer<typeof ProjectDoc>>;
