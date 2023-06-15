import { Table } from '../commons/Table';
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
import { useProjectsContext } from '@/lib/context/projectsContext';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  projectFilterSchema,
  projectsTableColumns,
  projectsTableFilters,
} from './ProjectsPage.consts';
import {
  filterByFilterPanel,
  getDefaultFilterValues,
} from '../commons/FilterPanel';
import { useEffect, useState } from 'react';

export const ProjectsTable = ({ projectType }: IProjectPageProps) => {
  const router = useRouter();
  const { data, isLoading } = useProjectsContext();
  const [activeFilters, setActiveFilters] = useState(
    Object.values(projectsTableColumns).reduce(
      (acc, curr) => ({ ...acc, [curr.fieldPath ?? curr.field]: false }),
      {},
    ),
  );

  const form = useForm<IProjectFilterDoc>({
    resolver: zodResolver(projectFilterSchema),
    defaultValues: getDefaultFilterValues(projectsTableFilters),
    mode: 'onSubmit',
  });

  const { control } = form;
  const watchedFields = useWatch({ control });

  useEffect(() => {
    const activeFilterFields: Partial<Record<ProjectFields, boolean>> = {};
    Object.entries(watchedFields).forEach(([field, { value }]) => {
      if (
        (Array.isArray(value) && value.length > 0) ||
        (typeof value === 'object' && Object.values(value).some(Boolean))
      ) {
        activeFilterFields[field as ProjectFields] = true;
      }
    });
    setActiveFilters({ ...activeFilterFields });
  }, [watchedFields]);

  const rows: IProjectDoc[] = data
    .filter((p) => p.projectType === projectType)
    .filter((r) => filterByFilterPanel(r, watchedFields as any)); //TODO: fix that type assertion
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
        rows={rows}
        columns={projectsTableColumns as any} //TODO: fix this type assertion
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
