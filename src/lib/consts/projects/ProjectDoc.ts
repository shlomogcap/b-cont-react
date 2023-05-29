import Z from 'zod';
import { WithIdField } from '@/lib/utils/WithIdField';
import { ProjectFields } from './ProjectFields';
import { validationTexts } from '../validationTexts';
import { ProjectType } from './ProjectType';
import { ProjectStatus } from './ProjectStatus';

export const ProjectDoc = Z.object({
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

export type IProjectDoc = WithIdField<Z.infer<typeof ProjectDoc>>;
