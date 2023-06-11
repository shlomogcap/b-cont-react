import { Table, fieldsNamesToColumns } from '../commons/Table';
import { IRoutesNames } from '../../consts/routes';
import {
  IProjectDoc,
  IProjectStatus,
  PROJECT_DISPLAY_TEXTS,
  ProjectFields,
} from '../../consts/projects';
import { IProjectFilterDoc, IProjectPageProps } from './ProjectsPage.types';
import { useRouter } from 'next/router';
import { sumBy } from 'lodash-es';
import { DISPLAY_TEXTS } from '@/lib/consts/displayTexts';
import { ProjectType } from '@/lib/consts/projects/ProjectType';
import { useProjectsContext } from '@/lib/context/projectsContext';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  projectFilterSchema,
  projectsTableFilters,
} from './ProjectsPage.consts';
import dayjs from 'dayjs';
import { IFilterItemType } from '../commons/FilterPanel';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
dayjs.extend(isSameOrAfter, isSameOrBefore);
export const ProjectsTable = ({ projectType }: IProjectPageProps) => {
  const router = useRouter();
  const { data, isLoading } = useProjectsContext();
  const form = useForm<IProjectFilterDoc>({
    resolver: zodResolver(projectFilterSchema),
    defaultValues: {
      status: [IProjectStatus.Active],
      sDate: { from: '', to: '' },
      eDate: { from: '', to: '' },
    },
    mode: 'onSubmit',
  });

  const { watch } = form;
  const watchedFields = watch();
  const filterByFilterPanel = (row: IProjectDoc) => {
    for (const field in watchedFields) {
      const tableColumnFilter = projectsTableFilters.find(
        (t) => t.field === field,
      );
      switch (tableColumnFilter?.type) {
        case IFilterItemType.Date:
          const [from, to] = [`${field}.from`, `${field}.to`];
          const [fromValue, toValue] = watch([from, to]);
          if (fromValue || toValue) {
            return (
              dayjs(row[field]).isSameOrAfter(dayjs(fromValue)) ||
              dayjs(row[field]).isSameOrBefore(dayjs(toValue))
            );
          }
        case IFilterItemType.Buttons:
          break;
        default:
          break;
      }
    }
    return true;
  };
  const rows = data
    .filter((p) => p.projectType === projectType)
    .filter(filterByFilterPanel);
  return (
    <FormProvider {...form}>
      <Table
        tableFilterProps={{
          filters: projectsTableFilters,
          displayTexts: PROJECT_DISPLAY_TEXTS.he.fields,
          status: IProjectStatus,
        }}
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
                  DISPLAY_TEXTS.he.routeNames[IRoutesNames.Projects]
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
    </FormProvider>
  );
};
