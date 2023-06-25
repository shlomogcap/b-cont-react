import { ILang } from '@/lib/consts/displayTexts';

type IDisplayTextMapping = {
  getModalTitle: (segmentName: string) => string;
};

export const DISPLAY_TEXTS: Record<ILang, IDisplayTextMapping> = {
  he: { getModalTitle: (segmentName) => `עבור ל ${segmentName}` },
  en: { getModalTitle: (segmentName) => `Go To ${segmentName}` },
};
