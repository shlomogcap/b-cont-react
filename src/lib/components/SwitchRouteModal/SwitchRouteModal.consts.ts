import { Lang } from '@/lib/consts/displayTexts';

type DisplayTextMapping = {
  getModalTitle: (segmentName: string) => string;
};

export const DISPLAY_TEXTS: Record<Lang, DisplayTextMapping> = {
  he: { getModalTitle: (segmentName) => `עבור ל ${segmentName}` },
  en: { getModalTitle: (segmentName) => `Go To ${segmentName}` },
};
