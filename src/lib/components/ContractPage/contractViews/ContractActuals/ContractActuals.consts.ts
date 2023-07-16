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

type IDispalyTexts = Record<
  ILang,
  {
    fields: Record<EContractActualsReportTableFields, string>;
    additionsSubtractions: Record<EAdditionsSubtractions, string>;
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
      },
      {
        field: EContractActualsReportTableFields.AccumelatedDelayCalculated,
      },
      {
        field: EContractActualsReportTableFields.AccumulatedHistory,
      },
      {
        field: EContractActualsReportTableFields.CurrentAccont,
      },
      {
        field: EContractActualsReportTableFields.ContractBudget,
      },
      {
        field: EContractActualsReportTableFields.DonePercentage,
      },
    ],
    CONTRACT_ACTUALS_REPORT_DISPLAY_TEXTS.he.fields,
  );
