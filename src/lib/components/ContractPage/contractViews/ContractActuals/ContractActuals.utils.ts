import { IReportTableSection } from '@/lib/components/ReportTable';
import { ESectionFields, ISectionDoc } from '@/lib/consts/sections';
import { EWorkspaceFields, IWorkspaceDoc } from '@/lib/consts/workspaces';
import { sortBy } from 'lodash-es';
import {
  CONTRACT_ACTUALS_REPORT_DISPLAY_TEXTS,
  EAdditionsSubtractions,
  EContractActualsReportTableFields,
} from './ContractActuals.consts';

const DEFAULT_WORKSPACE = '(default)';

export const prepareContractActualsReport = (
  contractSections: ISectionDoc[],
  workspaces: IWorkspaceDoc[],
): IReportTableSection<EContractActualsReportTableFields>[] => {
  const wsMap = new Map(workspaces.map((ws) => [ws.id, ws]));

  const injectRows = (
    id: string,
  ): IReportTableSection<EContractActualsReportTableFields> => {
    const workspace = wsMap.get(id);
    const result: Partial<
      IReportTableSection<EContractActualsReportTableFields>
    > = {
      title: workspace!.title,
    };

    const rows = contractSections.filter(
      (row) => row[ESectionFields.WorkspaceRef] === workspace?.path,
    );
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
