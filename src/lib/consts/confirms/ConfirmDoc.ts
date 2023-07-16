import { z } from 'zod';
import { COMMON_FIELDS_SCHEMA } from '../validation/commonFieldSchema';
import { EConfirmFields } from './ConfirmFields';
import {
  INTEGER_SCHEMA,
  OPTIONAL_DATE_SCHEMA,
  OPTIONAL_STRING_SCHEMA,
  STRING_SCHEMA,
  TITLE_FIELD_SCHEMA,
} from '../validation/validationSchema';
import { EConfirmType } from './ConfirmType';
import { EConfirmStatus } from './ConfirmStatus';

export const ConfirmDoc = z
  .object({
    [EConfirmFields.Title]: TITLE_FIELD_SCHEMA,
    [EConfirmFields.OrderIndex]: INTEGER_SCHEMA,
    [EConfirmFields.UserRole]: z.array(z.string()),
    [EConfirmFields.Due]: INTEGER_SCHEMA.min(1).max(28),
    [EConfirmFields.ConfirmType]: z.nativeEnum(EConfirmType),
    [EConfirmFields.NextConfirm]: STRING_SCHEMA,
    [EConfirmFields.ConfirmStatus]: z.nativeEnum(EConfirmStatus),
    [EConfirmFields.ApprovedAt]: OPTIONAL_DATE_SCHEMA,
    [EConfirmFields.ApprovedBy]: OPTIONAL_STRING_SCHEMA,
  })
  .merge(COMMON_FIELDS_SCHEMA);
export type IConfirmDoc = z.infer<typeof ConfirmDoc>;
