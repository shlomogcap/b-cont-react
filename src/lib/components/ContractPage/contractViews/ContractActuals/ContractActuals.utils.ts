import { IReportTableSection } from '@/lib/components/ReportTable';
import {
  ESectionActions,
  ESectionFields,
  ISectionDoc,
} from '@/lib/consts/sections';
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

const DEFAULT_WORKSPACE = '(default)';

type IPrepareContractActualsReportArgs = {
  contractSections: ISectionDoc[];
  workspaces: IWorkspaceDoc[];
  actuals: IActualDoc[];
  currentAccountPeriod: number;
};

export const prepareContractActualsReport = ({
  workspaces,
  contractSections,
  actuals,
  currentAccountPeriod,
}: IPrepareContractActualsReportArgs): IReportTableSection<EContractActualsReportTableFields>[] => {
  const wsMap = new Map(workspaces.map((ws) => [ws.id, ws]));

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

        // //TESTME: calc by:  Contract.totalDelay * (Section.currentActuals / Contract.totalActuals)
        // const totalDelayCalc = parseFloat(totalActuals * delayPercentageCalc)
        // const currentDelayCalc = parseFloat(currentActuals * delayPercentageCalc)

        // const lastAccountsActuals = section.calcLastTotalActuals({ accountRef })
        // const lastAccountsDelayCalc = parseFloat(lastAccountsActuals * delayPercentageHistoryCalc)
        // const percentDone = totalActuals / budget * 100

        // const currentRelease = delayRelease * (totalActuals / contractTotalActuals)
        // const delayCurrentPariod = totalDelayAccounts>0 ?currentDelayCalc + currentRelease : 0
        return {
          ...r,
          [EContractActualsReportTableFields.Title]: r[ESectionFields.Title],
          [EContractActualsReportTableFields.AccumulatedTotal]: totalActuals,
          [EContractActualsReportTableFields.AccumelatedDelayCalculated]: 0,
          [EContractActualsReportTableFields.AccumulatedHistory]: 0,
          [EContractActualsReportTableFields.CurrentAccont]:
            accountTotal /** TODO: subtract delay from total , i.e accountTotal - delayCurrentPariod */,
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
        title:
          CONTRACT_ACTUALS_REPORT_DISPLAY_TEXTS.he.additionsSubtractions[
            EAdditionsSubtractions.Additions
          ],
      },
      {
        title:
          CONTRACT_ACTUALS_REPORT_DISPLAY_TEXTS.he.additionsSubtractions[
            EAdditionsSubtractions.Subtractions
          ],
      },
    ],
    totals: {
      title: '100_000',
    },
  });
  // console.log(result);
  return result;
};
