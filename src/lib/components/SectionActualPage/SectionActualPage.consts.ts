import { ILang } from '@/lib/consts/displayTexts';

export enum EActualTableView {
  CumulativeView = 'cumulative',
  PeriodView = 'period',
}
export enum EBackToContractPageAction {
  SaveAndClose = 'saveAndClose',
  Cancel = 'cancel',
  DiscardAndClose = 'discardAndClose',
}

type IDisplayTextMapping = {
  tableViews: Record<EActualTableView, string>;
  backToContractConfirmat: {
    content: string;
    actions: Record<EBackToContractPageAction, string>;
  };
};

export const ACTUAL_TABLE_VIEW_DISPLAY_TEXT: Record<
  ILang,
  IDisplayTextMapping
> = {
  he: {
    tableViews: {
      [EActualTableView.CumulativeView]: 'חשבון מצטבר',
      [EActualTableView.PeriodView]: 'חשבון לפי תקופות',
    },
    backToContractConfirmat: {
      content: 'ישנם שינויים שלא נשמרו, האם ברצונך להסירם , לשמור או לבטל?',
      actions: {
        [EBackToContractPageAction.SaveAndClose]: 'שמור וסגור',
        [EBackToContractPageAction.Cancel]: 'ביטול',
        [EBackToContractPageAction.DiscardAndClose]: 'סגור ללא שמירה',
      },
    },
  },
  en: {
    tableViews: {
      [EActualTableView.CumulativeView]: 'Cumulative View',
      [EActualTableView.PeriodView]: 'Period View',
    },
    backToContractConfirmat: {
      content: `There are changes you didn't save , would you like to remove them , save them or cancel ?`,
      actions: {
        [EBackToContractPageAction.SaveAndClose]: 'Save And Close',
        [EBackToContractPageAction.Cancel]: 'Save And Close',
        [EBackToContractPageAction.DiscardAndClose]:
          'Discard Changes And Close',
      },
    },
  },
};

export const ACTUAL_TABLE_VIEW_TABS = [
  {
    id: EActualTableView.CumulativeView,
    text: ACTUAL_TABLE_VIEW_DISPLAY_TEXT.he.tableViews[
      EActualTableView.CumulativeView
    ],
  },
  {
    id: EActualTableView.PeriodView,
    text: ACTUAL_TABLE_VIEW_DISPLAY_TEXT.he.tableViews[
      EActualTableView.PeriodView
    ],
  },
];
