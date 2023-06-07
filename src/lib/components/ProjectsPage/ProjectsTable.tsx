import { Table, fieldsNamesToColumns } from '../commons/Table';
import { IRoutesNames } from '../../consts/routes';
import { PROJECT_DISPLAY_TEXTS, ProjectFields } from '../../consts/projects';
import { IProjectPageProps } from './ProjectsPage.types';
import { useRouter } from 'next/router';
import { sumBy } from 'lodash-es';
import { DISPLAY_TEXTS } from '@/lib/consts/displayTexts';
import { ProjectType } from '@/lib/consts/projects/ProjectType';
import { useProjectsContext } from '@/lib/context/projectsContext';

export const ProjectsTable = ({ projectType }: IProjectPageProps) => {
  const router = useRouter();
  const { data, isLoading } = useProjectsContext();
  const rows = data.filter((p) => p.projectType === projectType);
  return (
    <Table
      loading={isLoading}
      columns={fieldsNamesToColumns(
        [
          ProjectFields.Title,
          {
            field: ProjectFields.ProjectType,
            type: 'list',
            options: [
              ProjectType.Residential,
              ProjectType.Entrepreneurship,
              ProjectType.PublicSpace,
            ].map((projectType) => ({
              text: PROJECT_DISPLAY_TEXTS.he.projectTypes[projectType],
              value: projectType,
            })),
          },
          { field: ProjectFields.SDate, type: 'date' },
          { field: ProjectFields.EDate, type: 'date' },
          { field: ProjectFields.TotalAgreementSum, type: 'number' },
          { field: ProjectFields.TotalActualsSum, type: 'number' },
          ProjectFields.Address,
        ],
        PROJECT_DISPLAY_TEXTS.he.fields,
      )}
      rows={rows}
      totals={{
        [ProjectFields.Title]:
          rows.length < 2
            ? '-'
            : `${rows.length.toLocaleString()} ${
                DISPLAY_TEXTS.he.routeNames[IRoutesNames.ProjectsWithType]
              }`,
        [ProjectFields.TotalAgreementSum]: sumBy(
          rows,
          ProjectFields.TotalAgreementSum,
        ),
        [ProjectFields.TotalActualsSum]: sumBy(
          rows,
          ProjectFields.TotalActualsSum,
        ),
      }}
      onRowClick={({ id }) =>
        router.push({
          pathname: IRoutesNames.Project,
          query: { projectId: id, projectType },
        })
      }
    />
  );
};
