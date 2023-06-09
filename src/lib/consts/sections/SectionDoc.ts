import { z } from 'zod';
import { ESectionFields } from './SectionFields';
import {
  NUMBER_SCHEMA,
  OPTIONAL_NUMBER_SCHEMA,
  OPTIONAL_STRING_SCHEMA,
  TITLE_FIELD_SCHEMA,
} from '../validation/validationSchema';
import { ESectionCalculationType } from './SectionCalculationType';
import { ESectionCalculationMethod } from './SectionCalculationMethod';
import { IWithCommonFields } from '@/lib/utils/WithFields';

export const SectionDoc = z.object({
  [ESectionFields.Title]: TITLE_FIELD_SCHEMA,
  [ESectionFields.CalculationMethod]: z
    .nativeEnum(ESectionCalculationMethod)
    .optional(),
  [ESectionFields.CalculationType]: z
    .nativeEnum(ESectionCalculationType)
    .optional(),
  [ESectionFields.OrderIndex]: OPTIONAL_NUMBER_SCHEMA,
  [ESectionFields.AmountType]: OPTIONAL_STRING_SCHEMA,
  [ESectionFields.ItemsStartIndex]: OPTIONAL_NUMBER_SCHEMA,
  [ESectionFields.ItemPrice]: NUMBER_SCHEMA,
  [ESectionFields.ItemsCount]: NUMBER_SCHEMA,
  [ESectionFields.TotalSum]: NUMBER_SCHEMA,
  [ESectionFields.Description]: OPTIONAL_STRING_SCHEMA,
  [ESectionFields.DonePercentage]: OPTIONAL_NUMBER_SCHEMA,
  [ESectionFields.TotalActualsSum]: OPTIONAL_NUMBER_SCHEMA,
  [ESectionFields.WorkspaceRef]: z.string(),
});

export type ISectionDoc = IWithCommonFields<z.infer<typeof SectionDoc>>;
