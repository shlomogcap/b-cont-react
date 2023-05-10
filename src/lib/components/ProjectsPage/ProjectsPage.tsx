import { PageLayout } from '../PageLayout';
import {
  ITableRow,
  ITableColumn,
  Table,
  fieldsNamesToColumns,
  rawDataToRows,
} from '../commons/Table';
import { DISPLAY_TEXTS } from '../../consts/displayTexts';
import { ProjectType } from '../../consts/projectTypes';
import { Routes } from '../../consts/routes';
import {
  ID_FIELD,
  PROJECT_DISPLAY_TEXTS,
  ProjectFields,
} from './ProjectsPage.consts';
import { IProjectPageProps } from './ProjectsPage.types';

const rawData = [
  {
    [ID_FIELD]: '1',
    [ProjectFields.Title]: 'גליל ים',
    [ProjectFields.SDate]: '2023-01-01',
    [ProjectFields.EDate]: '2024-01-01',
    [ProjectFields.ProjectType]: ProjectType.Residential,
  },
  {
    [ID_FIELD]: '2',
    [ProjectFields.Title]: 'ברודצקי',
    [ProjectFields.SDate]: '2023-05-05',
    [ProjectFields.EDate]: '2025-05-05',
    [ProjectFields.ProjectType]: ProjectType.Residential,
  },
  {
    [ID_FIELD]: '3',
    [ProjectFields.Title]: 'רמת גן',
    [ProjectFields.SDate]: '2023-05-05',
    [ProjectFields.EDate]: '2025-05-05',
    [ProjectFields.ProjectType]: ProjectType.PublicSpace,
  },
];

export const ProjectsPage = ({ projectType }: IProjectPageProps) => {
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
        rows={rawDataToRows(
          rawData.filter((p) => p.projectType === projectType),
        )}
      />
    </PageLayout>
  );
};
