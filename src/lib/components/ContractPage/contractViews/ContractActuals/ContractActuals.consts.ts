import { IReportTableProps } from '@/lib/components/ReportTable';
import { fieldsNamesToColumns } from '@/lib/components/commons/Table';
import { ILang } from '@/lib/consts/displayTexts';

export enum EContractActualsReportTableFields {
  Title = 'title',
  AccumulatedTotal = 'accumulatedTotal',
  AccumelatedDelayCalculated = 'accumelatedDelayCalculated',
  AccumulatedHistory = 'accumulatedHistory',
  CurrentAccont = 'currentAccont',
  ContractBudget = 'contractBudget',
  DonePercentage = 'donePercentage',
}
export enum EAdditionsSubtractions {
  SectionTitle,
  Additions,
  Subtractions,
}
export enum EContractActualsButtons {
  AddNewComment,
}

type IDispalyTexts = Record<
  ILang,
  {
    fields: Record<EContractActualsReportTableFields, string>;
    additionsSubtractions: Record<EAdditionsSubtractions, string>;
    reportTitle: string;
    reportTotalsTitle: string;
    chatBlockTitle: string;
    buttons: Record<EContractActualsButtons, string>;
  }
>;

export const CONTRACT_ACTUALS_REPORT_DISPLAY_TEXTS: IDispalyTexts = {
  he: {
    fields: {
      [EContractActualsReportTableFields.Title]: 'סעיף',
      [EContractActualsReportTableFields.AccumulatedTotal]: 'תשלום מצטבר קרן',
      [EContractActualsReportTableFields.AccumelatedDelayCalculated]:
        'עיכבון מצטבר',
      [EContractActualsReportTableFields.AccumulatedHistory]: 'תקופות קודמות',
      [EContractActualsReportTableFields.CurrentAccont]: 'חשבון נוכחי',
      [EContractActualsReportTableFields.ContractBudget]: 'סכום הסכם',
      [EContractActualsReportTableFields.DonePercentage]: '% ביצוע הסכם',
    },
    reportTitle: 'דוח ביצוע מצטבר',
    reportTotalsTitle: `סה״כ`,
    chatBlockTitle: 'לוג הערות לחוזה',
    buttons: { [EContractActualsButtons.AddNewComment]: '+ הוסף הערה חדשה' },
    additionsSubtractions: {
      [EAdditionsSubtractions.SectionTitle]: 'תוספות וקיזוזים',
      [EAdditionsSubtractions.Additions]: 'תוספות',
      [EAdditionsSubtractions.Subtractions]: 'קיזוזים',
    },
  },
  en: {
    fields: {
      [EContractActualsReportTableFields.Title]: 'Section',
      [EContractActualsReportTableFields.AccumulatedTotal]: 'AccumulatedTotal',
      [EContractActualsReportTableFields.AccumelatedDelayCalculated]:
        'AccumelatedDelayCalculated',
      [EContractActualsReportTableFields.AccumulatedHistory]:
        'AccumulatedHistory',
      [EContractActualsReportTableFields.CurrentAccont]: 'CurrentAccont',
      [EContractActualsReportTableFields.ContractBudget]: 'ContractBudget',
      [EContractActualsReportTableFields.DonePercentage]: 'DonePercentage',
    },
    reportTitle: 'Cumulative Actulas Report',
    reportTotalsTitle: 'Total',
    chatBlockTitle: 'Comments Logs',
    buttons: { [EContractActualsButtons.AddNewComment]: '+ New Comment' },
    additionsSubtractions: {
      [EAdditionsSubtractions.SectionTitle]: 'Additions & Subtractions',
      [EAdditionsSubtractions.Additions]: 'Additions',
      [EAdditionsSubtractions.Subtractions]: 'Subtractions',
    },
  },
};

export const columns: IReportTableProps<EContractActualsReportTableFields>['columns'] =
  fieldsNamesToColumns(
    [
      {
        field: EContractActualsReportTableFields.Title,
      },
      {
        field: EContractActualsReportTableFields.AccumulatedTotal,
        type: 'currency',
        options: {
          maximumFractionDigits: 0,
        },
      },
      {
        field: EContractActualsReportTableFields.AccumelatedDelayCalculated,
        type: 'currency',
        options: {
          maximumFractionDigits: 0,
        },
      },
      {
        field: EContractActualsReportTableFields.AccumulatedHistory,
        type: 'currency',
        options: {
          maximumFractionDigits: 0,
        },
      },
      {
        field: EContractActualsReportTableFields.CurrentAccont,
        type: 'currency',
        options: {
          maximumFractionDigits: 0,
        },
      },
      {
        field: EContractActualsReportTableFields.ContractBudget,
        type: 'currency',
        options: {
          maximumFractionDigits: 0,
        },
      },
      {
        field: EContractActualsReportTableFields.DonePercentage,
        type: 'percentage',
        options: { maximumFractionDigits: 2 },
      },
    ],
    CONTRACT_ACTUALS_REPORT_DISPLAY_TEXTS.he.fields,
  );
