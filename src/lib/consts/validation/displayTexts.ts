import { ILang } from '@/lib/consts/displayTexts';

export enum EErrorMessage {
  Required,
  TooShort,
  TooLow,
  TooHigh,
}

type IDisplayTextMapping = {
  errosMessages: Record<EErrorMessage, string>;
};

export const VALIDATION_DISPLAY_TEXTS: Record<ILang, IDisplayTextMapping> = {
  he: {
    errosMessages: {
      [EErrorMessage.Required]: 'שדה חובה',
      [EErrorMessage.TooShort]: 'ערך קצר מדי',
      [EErrorMessage.TooLow]: 'ערך נמוך מדי',
      [EErrorMessage.TooHigh]: 'ערך גבוה מדי',
    },
  },
  en: {
    errosMessages: {
      [EErrorMessage.Required]: 'Field Is Required',
      [EErrorMessage.TooShort]: 'Value Too Short',
      [EErrorMessage.TooLow]: 'Value Too Low',
      [EErrorMessage.TooHigh]: 'Value Too High',
    },
  },
};
