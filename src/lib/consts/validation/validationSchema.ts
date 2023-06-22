import { z } from 'zod';
import { IErrorMessage, VALIDATION_DISPLAY_TEXTS } from './displayTexts';

export const REQUIRED_STRING_SCHEMA = z
  .string({
    required_error:
      VALIDATION_DISPLAY_TEXTS.he.errosMessages[IErrorMessage.Required],
  })
  .nonempty(VALIDATION_DISPLAY_TEXTS.he.errosMessages[IErrorMessage.Required]);

export const TITLE_FIELD_SCHEMA = REQUIRED_STRING_SCHEMA.min(
  4,
  VALIDATION_DISPLAY_TEXTS.he.errosMessages[IErrorMessage.TooShort],
);

export const INTEGER_SCHEMA = z.coerce.number().int().positive();
export const NUMBER_SCHEMA = z.preprocess(
  (v) => Number(String(v).replace(/[^\d\.-]/g, '')),
  z.coerce.number(),
);

export const OPTIONAL_STRING_SCHEMA = z.string().optional();
export const OPTIONAL_BOOLEAN_SCHEMA = z.boolean().optional();
export const OPTIONAL_NUMBER_SCHEMA = NUMBER_SCHEMA.optional();
export const OPTIONAL_DATE_SCHEMA = z.coerce.date().optional();
