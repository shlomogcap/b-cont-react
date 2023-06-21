import { WithCommonFields } from '@/lib/utils/WithFields';
import Z from 'zod';
import { EMilestoneFields } from './MilestoneFields';
import {
  NUMBER_SCHEMA,
  TITLE_FIELD_SCHEMA,
} from '../validation/validationSchema';

export const MilestoneDoc = Z.object({
  [EMilestoneFields.Title]: TITLE_FIELD_SCHEMA,
  [EMilestoneFields.OrderIndex]: NUMBER_SCHEMA,
  [EMilestoneFields.Price]: NUMBER_SCHEMA,
  [EMilestoneFields.TotalDone]: NUMBER_SCHEMA,
  [EMilestoneFields.Weight]: NUMBER_SCHEMA,
});

export type ISectionDoc = WithCommonFields<Z.infer<typeof MilestoneDoc>>;
