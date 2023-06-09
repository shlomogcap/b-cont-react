import { IReportTableSection } from '@/lib/components/ReportTable';
import { ESectionFields, ISectionDoc } from '@/lib/consts/sections';
import { EWorkspaceFields, IWorkspaceDoc } from '@/lib/consts/workspaces';
import { sortBy } from 'lodash-es';

const DEFAULT_WORKSPACE = '(default)';

export const prepareContractSectionReport = (
  contractSections: ISectionDoc[],
  workspaces: IWorkspaceDoc[],
): IReportTableSection<ESectionFields>[] => {
  const wsMap = new Map(workspaces.map((ws) => [ws.id, ws]));

  function injectRows(id: string): IReportTableSection<ESectionFields> {
    const workspace = wsMap.get(id);
    const result: Partial<IReportTableSection<ESectionFields>> = {
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

    return result as IReportTableSection<ESectionFields>;
  }

  const sortedWorkspaces = sortBy(workspaces, EWorkspaceFields.OrderIndex);
  const sortedRows = sortBy(contractSections, ESectionFields.OrderIndex);

  const defaultSection: IReportTableSection<ESectionFields> = {
    title: DEFAULT_WORKSPACE,
    rows: [],
  };

  sortedRows.forEach((row) => {
    if (!row[ESectionFields.WorkspaceRef]) {
      defaultSection.rows?.push(row);
    }
  });

  const result: IReportTableSection<ESectionFields>[] = sortedWorkspaces
    .reduce(
      (acc: IReportTableSection<ESectionFields>[], curr: IWorkspaceDoc) => {
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

  return result;
};
