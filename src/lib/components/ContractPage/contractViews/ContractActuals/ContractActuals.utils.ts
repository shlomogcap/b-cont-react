import { IReportTableSection } from '@/lib/components/ReportTable';
import { ESectionFields, ISectionDoc } from '@/lib/consts/sections';
import { EWorkspaceFields, IWorkspaceDoc } from '@/lib/consts/workspaces';
import { sortBy, sumBy } from 'lodash-es';
import {
  CONTRACT_ACTUALS_REPORT_DISPLAY_TEXTS,
  EAdditionsSubtractions,
  EContractActualsReportTableFields,
} from './ContractActuals.consts';
import { IActualDoc } from '@/lib/consts/actuals/ActualDoc';
import { getRelatedActuals } from '@/lib/utils/actualsCalculation';
import { EActualFields } from '@/lib/consts/actuals/ActualFields';
import { EContractFields, IContractDoc } from '@/lib/consts/contracts';
import { IAccountDoc } from '@/lib/consts/accounts/AccountDoc';
import { EAccountFields } from '@/lib/consts/accounts/AccountFields';
import { sumByRows } from '@/lib/components/ReportTable/ReportTable.utils';

const DEFAULT_WORKSPACE = '(default)';

type IPrepareContractActualsReportArgs = {
  contract: IContractDoc;
  accounts: IAccountDoc[];
  contractSections: ISectionDoc[];
  workspaces: IWorkspaceDoc[];
  actuals: IActualDoc[];
  currentAccount: IAccountDoc;
};

export const prepareContractActualsReport = ({
  contract,
  accounts,
  currentAccount,
  workspaces,
  contractSections,
  actuals,
}: IPrepareContractActualsReportArgs): IReportTableSection<EContractActualsReportTableFields>[] => {
  const wsMap = new Map(workspaces.map((ws) => [ws.id, ws]));
  const currentAccountPeriod = Number(
    currentAccount[EAccountFields.PeriodNumber],
  );

  const contractRelatedAccount = accounts.filter(
    (account) => account[EAccountFields.PeriodNumber] <= currentAccountPeriod,
  );
  const contractTotalActuals = sumBy(
    contractRelatedAccount,
    EAccountFields.TotalSections,
  );
  const contractTotalDelay = sumBy(
    contractRelatedAccount,
    EAccountFields.TotalDelay,
  );
  const contractTotalDelayRelease = sumBy(
    contractRelatedAccount,
    EAccountFields.DelayRelease,
  );
  const contractTotalDelayCalc = contractTotalDelay - contractTotalDelayRelease;
  const currentAccountDelayCalc =
    currentAccount[EAccountFields.TotalDelay] -
    currentAccount[EAccountFields.DelayRelease];
  const totalHistoryDelayCalc =
    contractTotalDelayCalc - currentAccountDelayCalc;
  // const contractBudget = contract[EContractFields.TotalAgreementSum]; // TODO:+ additions.sum - subtractions.sum

  const injectRows = (
    id: string,
  ): IReportTableSection<EContractActualsReportTableFields> => {
    const workspace = wsMap.get(id);
    const result = {
      title: workspace!.title,
    } as IReportTableSection<EContractActualsReportTableFields>;

    const rows = contractSections
      .filter((row) => row[ESectionFields.WorkspaceRef] === workspace?.path)
      .map((r) => {
        const relatedActuals = getRelatedActuals({
          currentAccountPeriod,
          actuals,
          sectionRef: r.path,
        });
        const totalActuals = sumBy(relatedActuals, EActualFields.CurrentTotal);
        const accountTotal = sumBy(
          relatedActuals.filter(
            (actual) =>
              actual[EActualFields.PeriodNumber] === currentAccountPeriod,
          ),
          EActualFields.CurrentTotal,
        );
        const sectionContractBudget = r[ESectionFields.TotalSum];
        const totalDelayCalc = totalActuals * contractTotalDelayCalc;
        const currentDelayCalc = accountTotal * currentAccountDelayCalc;
        return {
          ...r,
          [EContractActualsReportTableFields.Title]: r[ESectionFields.Title],
          [EContractActualsReportTableFields.AccumulatedTotal]: totalActuals,
          [EContractActualsReportTableFields.AccumelatedDelayCalculated]:
            totalDelayCalc,
          [EContractActualsReportTableFields.AccumulatedHistory]:
            totalActuals - accountTotal - totalHistoryDelayCalc,
          [EContractActualsReportTableFields.CurrentAccount]:
            accountTotal - currentDelayCalc,
          [EContractActualsReportTableFields.ContractBudget]:
            sectionContractBudget,
          [EContractActualsReportTableFields.DonePercentage]:
            totalActuals / sectionContractBudget,
        };
      });
    if (rows.length > 0) {
      result.rows = sortBy(rows, EWorkspaceFields.OrderIndex);
    }

    const subChildren = workspaces.filter(
      (child) => child.parent === String(workspace?.path),
    );
    if (subChildren.length > 0) {
      result.sections = sortBy(
        subChildren
          .map((child) => injectRows(String(child.id)))
          .filter((section) => section.rows || section.sections),
        EWorkspaceFields.OrderIndex,
      );
    }

    return result as IReportTableSection<EContractActualsReportTableFields>;
  };

  const sortedWorkspaces = sortBy(workspaces, EWorkspaceFields.OrderIndex);
  const sortedRows = sortBy(contractSections, ESectionFields.OrderIndex);

  const defaultSection: IReportTableSection<EContractActualsReportTableFields> =
    {
      title: DEFAULT_WORKSPACE,
      rows: [],
    };

  sortedRows.forEach((row) => {
    if (!row[ESectionFields.WorkspaceRef]) {
      defaultSection.rows?.push(row);
    }
  });

  const result: IReportTableSection<EContractActualsReportTableFields>[] =
    sortedWorkspaces
      .reduce(
        (
          acc: IReportTableSection<EContractActualsReportTableFields>[],
          curr: IWorkspaceDoc,
        ) => {
          if (!curr.parent) {
            const section = injectRows(String(curr.id));
            if (section.rows || section.sections) {
              acc.push(section);
            }
          }
          return acc;
        },
        [defaultSection],
      )
      .filter((section) => section.rows?.length || section.sections?.length);

  result.push({
    title:
      CONTRACT_ACTUALS_REPORT_DISPLAY_TEXTS.he.additionsSubtractions[
        EAdditionsSubtractions.SectionTitle
      ],
    rows: [
      {
        id: EAdditionsSubtractions.Additions,
        title:
          CONTRACT_ACTUALS_REPORT_DISPLAY_TEXTS.he.additionsSubtractions[
            EAdditionsSubtractions.Additions
          ],
        [EContractActualsReportTableFields.AccumulatedTotal]: 0,
        [EContractActualsReportTableFields.AccumelatedDelayCalculated]: 0,
        [EContractActualsReportTableFields.AccumulatedHistory]: 0,
        [EContractActualsReportTableFields.CurrentAccount]: 0,
        [EContractActualsReportTableFields.ContractBudget]: 0,
        [EContractActualsReportTableFields.DonePercentage]: 0,
      },
      {
        id: EAdditionsSubtractions.Subtractions,
        title:
          CONTRACT_ACTUALS_REPORT_DISPLAY_TEXTS.he.additionsSubtractions[
            EAdditionsSubtractions.Subtractions
          ],
        [EContractActualsReportTableFields.AccumulatedTotal]: 0,
        [EContractActualsReportTableFields.AccumelatedDelayCalculated]: 0,
        [EContractActualsReportTableFields.AccumulatedHistory]: 0,
        [EContractActualsReportTableFields.CurrentAccount]: 0,
        [EContractActualsReportTableFields.ContractBudget]: 0,
        [EContractActualsReportTableFields.DonePercentage]: 0,
      },
    ],
  });
  result.push({
    title: '',
    rows: [],
    totals: {
      [EContractActualsReportTableFields.Title]:
        CONTRACT_ACTUALS_REPORT_DISPLAY_TEXTS.he.reportTotalsTitle,
      [EContractActualsReportTableFields.AccumulatedTotal]: sumByRows(
        result,
        EContractActualsReportTableFields.AccumulatedTotal,
      ),
      [EContractActualsReportTableFields.AccumelatedDelayCalculated]: sumByRows(
        result,
        EContractActualsReportTableFields.AccumelatedDelayCalculated,
      ),
      [EContractActualsReportTableFields.AccumulatedHistory]: sumByRows(
        result,
        EContractActualsReportTableFields.AccumulatedHistory,
      ),
      [EContractActualsReportTableFields.CurrentAccount]: sumByRows(
        result,
        EContractActualsReportTableFields.CurrentAccount,
      ),
      [EContractActualsReportTableFields.ContractBudget]: sumByRows(
        result,
        EContractActualsReportTableFields.ContractBudget,
      ),
      [EContractActualsReportTableFields.DonePercentage]: 0, //TODO: done / budget,
    },
  });
  return result;
};
