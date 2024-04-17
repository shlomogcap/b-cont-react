import { z } from 'zod';
import { EErrorMessage, VALIDATION_DISPLAY_TEXTS } from './displayTexts';

export const PASSWORD_MIN_LENGTH = 6;

export const TITLE_FIELD_SCHEMA = z
  .string({
    required_error:
      VALIDATION_DISPLAY_TEXTS.he.errosMessages[EErrorMessage.Required],
  })
  .nonempty(VALIDATION_DISPLAY_TEXTS.he.errosMessages[EErrorMessage.Required])
  .min(4, VALIDATION_DISPLAY_TEXTS.he.errosMessages[EErrorMessage.TooShort]);

export const INTEGER_SCHEMA = z.coerce.number().int().positive();
export const NUMBER_SCHEMA = z.preprocess(
  (v) => Number(String(v).replace(/[^\d\.-]/g, '')),
  z.coerce.number(),
);

export const STRING_SCHEMA = z.string();

export const PASSWORD_SCHEMA = STRING_SCHEMA.refine(
  (v) => v.length >= PASSWORD_MIN_LENGTH,
  {
    message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters long`,
  },
);

export const OPTIONAL_STRING_SCHEMA = STRING_SCHEMA.optional();
export const OPTIONAL_BOOLEAN_SCHEMA = z.boolean().optional();
export const OPTIONAL_NUMBER_SCHEMA = NUMBER_SCHEMA.optional();
export const OPTIONAL_DATE_SCHEMA = z.string().optional();
