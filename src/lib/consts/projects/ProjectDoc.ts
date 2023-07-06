import { z } from 'zod';
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
import { EProjectFields } from './ProjectFields';
import { IWithCommonFields } from '@/lib/utils/WithFields';
import { EProjectType } from './ProjectType';
import { EProjectStatus } from './ProjectStatus';

export const ProjectDoc = z.object({
  [EProjectFields.Title]: TITLE_FIELD_SCHEMA,
  [EProjectFields.Address]: OPTIONAL_STRING_SCHEMA,
  [EProjectFields.SDate]: OPTIONAL_DATE_SCHEMA,
  [EProjectFields.NumberOfPeriods]: z.coerce
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
  [EProjectFields.ProjectType]: z.nativeEnum(EProjectType),
  [EProjectFields.NumberOfBuildings]: z.coerce
    .number()
    .min(1, VALIDATION_DISPLAY_TEXTS.he.errosMessages[EErrorMessage.TooLow])
    .max(20, VALIDATION_DISPLAY_TEXTS.he.errosMessages[EErrorMessage.TooHigh])
    .optional(),
  [EProjectFields.Basements]: OPTIONAL_NUMBER_SCHEMA,
  [EProjectFields.NumberOfApatrments]: OPTIONAL_NUMBER_SCHEMA,
  [EProjectFields.Status]: z.nativeEnum(EProjectStatus).optional(),
});

export type IProjectDoc = IWithCommonFields<z.infer<typeof ProjectDoc>>;
