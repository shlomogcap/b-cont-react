import { IReportTableSection } from '@/lib/components/ReportTable';
import { ICommonFields } from '@/lib/consts/commonFields';
import { ESectionFields, ISectionDoc } from '@/lib/consts/sections';
import { IWorkspaceGroupDoc } from '@/lib/consts/workspaces';

const DEFAULT_WORKSPACE = '(default)';

export const prepareContractSectionReport = (
  contractSections: ISectionDoc[],
  workspaces: IWorkspaceGroupDoc[],
): IReportTableSection<ESectionFields>[] => {
  //TODO: implement workspace/group logic by adding object field inside section to manage this + sort by workspace/index and then by group/index and then by section/index
  const result: IReportTableSection<ESectionFields>[] = [];
  const indexWorkspaceDir: Record<
    string,
    Record<string, { title: string; rows: ISectionDoc[] }>
  > = {};
  contractSections.forEach((sectionData) => {
    const workspaceId = String(
      sectionData.workspaceAreaRef || DEFAULT_WORKSPACE,
    );
    const groupId = String(sectionData.workspaceGroupRef || DEFAULT_WORKSPACE);
    if (workspaceId && !indexWorkspaceDir[workspaceId]) {
      indexWorkspaceDir[workspaceId] = {
        [groupId]: {
          title:
            workspaces.find((ws) => ws[ICommonFields.Path] === workspaceId)
              ?.title ?? '',
          rows: [sectionData],
        },
      };
      return;
    }
    if (workspaceId && groupId && !indexWorkspaceDir[workspaceId][groupId]) {
      indexWorkspaceDir[workspaceId] = {
        [groupId]: {
          title:
            workspaces.find((grp) => grp[ICommonFields.Path] === groupId)
              ?.title ?? '',
          rows: [sectionData],
        },
      };
      return;
    }
    indexWorkspaceDir[workspaceId]?.[groupId]?.rows.push(sectionData);
  });
  console.log(indexWorkspaceDir);
  return [
    {
      title: '',
      sections: [
        {
          title: '',
          rows: contractSections,
        },
      ],
    },
  ];
};
