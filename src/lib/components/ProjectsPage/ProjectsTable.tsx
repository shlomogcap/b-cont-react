import { Table, fieldsNamesToColumns } from '../commons/Table';
import { Routes } from '../../consts/routes';
import { PROJECT_DISPLAY_TEXTS, ProjectFields } from '../../consts/projects';
import { IProjectPageProps } from './ProjectsPage.types';
import { useRouter } from 'next/router';
import { MOCK_PROJECTS_DATA } from '@/lib/mock/projects';
import { sumBy } from 'lodash-es';
import { DISPLAY_TEXTS } from '@/lib/consts/displayTexts';
import { ProjectType } from '@/lib/consts/projects/ProjectType';

export const ProjectsTable = ({ projectType }: IProjectPageProps) => {
  const router = useRouter();

  const rows = MOCK_PROJECTS_DATA.filter((p) => p.projectType === projectType);

  return (
    <Table
      columns={fieldsNamesToColumns(
        [
          ProjectFields.Title,
          {
            field: ProjectFields.ProjectType,
            type: 'list',
            options: [{ text: PROJECT_DISPLAY_TEXTS.he., value: ProjectType.Entrepreneurship }],
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
                DISPLAY_TEXTS.he.routeNames[Routes.Projects]
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
          pathname: Routes.Project,
          query: { projectId: id, projectType },
        })
      }
    />
  );
};
