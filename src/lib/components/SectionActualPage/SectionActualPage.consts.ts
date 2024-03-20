import { ILang } from '@/lib/consts/displayTexts';

export enum EActualTableView {
  CumulativeView = 'cumulative',
  PeriodView = 'period',
}

export const ACTUAL_TABLE_VIEW_DISPLAY_TEXT: Record<
  ILang,
  Record<EActualTableView, string>
> = {
  he: {
    [EActualTableView.CumulativeView]: 'חשבון מצטבר',
    [EActualTableView.PeriodView]: 'חשבון לפי תקופות',
  },
  en: {
    [EActualTableView.CumulativeView]: 'Cumulative View',
    [EActualTableView.PeriodView]: 'Period View',
  },
};

export const ACTUAL_TABLE_VIEW_TABS = [
  {
    id: EActualTableView.CumulativeView,
    text: ACTUAL_TABLE_VIEW_DISPLAY_TEXT.he[EActualTableView.CumulativeView],
  },
  {
    id: EActualTableView.PeriodView,
    text: ACTUAL_TABLE_VIEW_DISPLAY_TEXT.he[EActualTableView.PeriodView],
  },
];
