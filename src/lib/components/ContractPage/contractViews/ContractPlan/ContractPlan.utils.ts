import { IReportTableSection } from '@/lib/components/ReportTable';
import { ESectionFields, ISectionDoc } from '@/lib/consts/sections';
// import { DUMMY_REPORT_DATA } from './ContractPlan.consts';

// const parseWorkspacePath = (path: string) => {
//   const [ws, wsId, grp, grpId] = path.split('/');
//   return [`${ws}/${wsId}`, `${grp}/${grpId}`];
// };

export const prepareContractSectionReport = (
  contractSections: ISectionDoc[],
): IReportTableSection<ESectionFields>[] => {
  //TODO: implement workspace/group logic by adding object field inside section to manage this + sort by workspace/index and then by group/index and then by section/index
  //   const result: IReportTableSection<ESectionFields>[] = [];
  //   const indexWorkspaceDir: Record<
  //     string,
  //     Record<string, { title: string; rows: ISectionDoc[] }>
  //   > = {};
  //   contractSections.forEach((sectionData) => {
  //     const [wsPath, grpPath] = parseWorkspacePath(
  //       String(sectionData.workspacePath),
  //     );
  //     if (!indexWorkspaceDir[wsPath]) {
  //       indexWorkspaceDir[wsPath] = {
  //         [grpPath]: { title: '', rows: [sectionData] },
  //       };
  //       return;
  //     }
  //     if (!indexWorkspaceDir[wsPath][grpPath]) {
  //       indexWorkspaceDir[wsPath] = {
  //         [grpPath]: { title: '', rows: [sectionData] },
  //       };
  //       return;
  //     }
  //     indexWorkspaceDir[wsPath]?.[grpPath]?.rows.push(sectionData);
  //   });
  //   console.log(indexWorkspaceDir);
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
