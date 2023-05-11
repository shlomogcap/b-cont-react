import { PageLayout } from '../PageLayout';
import { Table, fieldsNamesToColumns } from '../commons/Table';
import { DISPLAY_TEXTS } from '../../consts/displayTexts';
import { Routes } from '../../consts/routes';
import { PROJECT_DISPLAY_TEXTS, ProjectFields } from '../../consts/project';
import { IProjectPageProps } from './ProjectsPage.types';
import { useRouter } from 'next/router';
import { MOCK_PROJECTS_DATA } from '@/lib/mock/projects';

export const ProjectsPage = ({ projectType }: IProjectPageProps) => {
  const router = useRouter();

  const title = projectType
    ? DISPLAY_TEXTS.he.projectType[projectType]
    : DISPLAY_TEXTS.he.routeNames[Routes.Projects];

  return (
    <PageLayout title={title}>
      <Table
        columns={fieldsNamesToColumns(
          [ProjectFields.Title, ProjectFields.SDate, ProjectFields.EDate],
          PROJECT_DISPLAY_TEXTS.he,
        )}
        rows={MOCK_PROJECTS_DATA.filter((p) => p.projectType === projectType)}
        onRowClick={({ id }) =>
          router.push({
            pathname: Routes.Project,
            query: { projectId: id, projectType },
          })
        }
      />
    </PageLayout>
  );
};
