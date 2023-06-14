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
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  projectFilterSchema,
  projectsTableFilters,
} from './ProjectsPage.consts';
import { IFilterItemType } from '../commons/FilterPanel';
import {
  isBetween,
  isSameOrAfter,
  isSameOrBefore,
} from '@/lib/utils/dateUtils';
import { useEffect, useState } from 'react';

const columns = fieldsNamesToColumns(
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
);

export const ProjectsTable = ({ projectType }: IProjectPageProps) => {
  const router = useRouter();
  const { data, isLoading } = useProjectsContext();
  const [activeFilters, setActiveFilters] = useState(
    Object.values(columns).reduce(
      (acc, curr) => ({ ...acc, [curr.fieldPath ?? curr.field]: false }),
      {},
    ),
  );

  const form = useForm<IProjectFilterDoc>({
    resolver: zodResolver(projectFilterSchema),
    defaultValues: {
      status: [IProjectStatus.Active],
      sDate: { from: '', to: '' },
      eDate: { from: '', to: '' },
    },
    mode: 'onSubmit',
  });

  const { control } = form;
  const watchedFields = useWatch({ control });

  const filterByFilterPanel = (row: IProjectDoc) => {
    return Object.entries(watchedFields).every(([field, value]) => {
      const tableColumnFilter = projectsTableFilters.find(
        (t) => t.field === field,
      );
      switch (tableColumnFilter?.type) {
        case IFilterItemType.Date:
          const [fromValue, toValue] = [value?.from, value?.to];
          const fieldValue: string = row[field] ?? '';

          if ((!fromValue && !toValue) || !fieldValue) {
            return true;
          }
          if (fromValue && toValue) {
            return isBetween(fieldValue, fromValue, toValue);
          }
          if (fromValue) {
            return isSameOrAfter(fieldValue, fromValue);
          }
          if (toValue) {
            return isSameOrBefore(fieldValue, toValue);
          }
        case IFilterItemType.Buttons:
          return value.includes(row[field]);
        default:
          break;
      }
      return true;
    });
  };

  const updateActiveFilterFields = () => {
    const activeFilterFields = {};
    Object.keys(watchedFields).forEach((field) => {
      const filterField = watchedFields[field];
      if (
        filterField.length ||
        Object.values(filterField).some((value: string) => value.length)
      ) {
        activeFilterFields[field] = true;
      }
    });
    setActiveFilters({ ...activeFilterFields });
  };

  useEffect(() => {
    updateActiveFilterFields();
  }, [watchedFields]);

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
          activeFilters,
        }}
        loading={isLoading}
        columns={columns}
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
    </FormProvider>
  );
};
