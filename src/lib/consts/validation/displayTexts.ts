import { Lang } from '@/lib/consts/displayTexts';

export enum EErrorMessage {
  Required,
  TooShort,
  TooLow,
  TooHigh,
}

type DisplayTextMapping = {
  errosMessages: Record<IErrorMessage, string>;
};

export const VALIDATION_DISPLAY_TEXTS: Record<Lang, DisplayTextMapping> = {
  he: {
    errosMessages: {
      [IErrorMessage.Required]: 'שדה חובה',
      [IErrorMessage.TooShort]: 'ערך קצר מדי',
      [IErrorMessage.TooLow]: 'ערך נמוך מדי',
      [IErrorMessage.TooHigh]: 'ערך גבוה מדי',
    },
  },
  en: {
    errosMessages: {
      [IErrorMessage.Required]: 'Field Is Required',
      [IErrorMessage.TooShort]: 'Value Too Short',
      [IErrorMessage.TooLow]: 'Value Too Low',
      [IErrorMessage.TooHigh]: 'Value Too High',
    },
  },
};
