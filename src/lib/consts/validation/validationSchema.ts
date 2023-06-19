import Z from 'zod';
import { EErrorMessage, VALIDATION_DISPLAY_TEXTS } from './displayTexts';

export const TITLE_FIELD_SCHEMA = Z.string({
  required_error:
    VALIDATION_DISPLAY_TEXTS.he.errosMessages[EErrorMessage.Required],
})
  .nonempty(VALIDATION_DISPLAY_TEXTS.he.errosMessages[EErrorMessage.Required])
  .min(4, VALIDATION_DISPLAY_TEXTS.he.errosMessages[EErrorMessage.TooShort]);

export const OPTIONAL_STRING_SCHEMA = Z.string().optional();
export const OPTIONAL_BOOLEAN_SCHEMA = Z.boolean().optional();
export const OPTIONAL_NUMBER_SCHEMA = Z.coerce.number().optional();
export const OPTIONAL_DATE_SCHEMA = Z.coerce.date().optional();
