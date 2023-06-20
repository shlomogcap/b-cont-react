import Z from 'zod';
import { IErrorMessage, VALIDATION_DISPLAY_TEXTS } from './displayTexts';

export const REQUIRED_STRING_SCHEMA = Z.string({
  required_error:
    VALIDATION_DISPLAY_TEXTS.he.errosMessages[IErrorMessage.Required],
}).nonempty(VALIDATION_DISPLAY_TEXTS.he.errosMessages[IErrorMessage.Required]);

export const TITLE_FIELD_SCHEMA = REQUIRED_STRING_SCHEMA.min(
  4,
  VALIDATION_DISPLAY_TEXTS.he.errosMessages[IErrorMessage.TooShort],
);

export const INTEGER_SCHEMA = Z.coerce.number().int().positive();

export const OPTIONAL_STRING_SCHEMA = Z.string().optional();
export const OPTIONAL_BOOLEAN_SCHEMA = Z.boolean().optional();
export const OPTIONAL_NUMBER_SCHEMA = Z.coerce.number().optional();
export const OPTIONAL_DATE_SCHEMA = Z.coerce.date().optional();
