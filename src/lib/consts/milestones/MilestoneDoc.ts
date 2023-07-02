import { z } from 'zod';
import { EMilestoneFields } from './MilestoneFields';
import {
  NUMBER_SCHEMA,
  TITLE_FIELD_SCHEMA,
} from '../validation/validationSchema';
import { COMMON_FIELDS_SCHEMA } from '../validation/commonFieldSchema';

export const MilestoneDoc = z
  .object({
    [EMilestoneFields.Title]: TITLE_FIELD_SCHEMA,
    [EMilestoneFields.OrderIndex]: NUMBER_SCHEMA,
    [EMilestoneFields.Price]: NUMBER_SCHEMA,
    [EMilestoneFields.TotalDone]: NUMBER_SCHEMA,
    [EMilestoneFields.Weight]: NUMBER_SCHEMA,
  })
  .merge(COMMON_FIELDS_SCHEMA);

export type IMilestoneDoc = z.infer<typeof MilestoneDoc>;
