import { Table } from '../commons/Table';
import { ERoutesNames } from '../../consts/routes';
import {
  IProjectDoc,
  EProjectStatus,
  PROJECT_DISPLAY_TEXTS,
  EProjectFields,
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
  projectTableSearchFields,
} from './ProjectsPage.consts';
import {
  filterByFilterPanel,
  filterBySearch,
  getDefaultFilterValues,
} from '../commons/FilterPanel';
import { useEffect, useState } from 'react';
import {
  SearchableContextProvider,
  useSearchableContext,
} from '../commons/SearchBar/searchableContext';
import { useFilteredFields } from '@/lib/hooks/useFilteredFields';

export const ProjectsTable = (props: IProjectPageProps) => {
  const form = useForm<IProjectFilterDoc>({
    resolver: zodResolver(projectFilterSchema),
    defaultValues: getDefaultFilterValues(projectsTableFilters),
    mode: 'onSubmit',
  });
  return (
    <FormProvider {...form}>
      <SearchableContextProvider>
        <ProjectsTableInner {...props} />
      </SearchableContextProvider>
    </FormProvider>
  );
};

const ProjectsTableInner = ({ projectType }: IProjectPageProps) => {
  const router = useRouter();
  const { data, isLoading } = useProjectsContext();
  const { searchValue } = useSearchableContext();
  const [activeFilters, setActiveFilters] = useState(
    Object.values(projectsTableColumns).reduce(
      (acc, curr) => ({ ...acc, [curr.fieldPath ?? curr.field]: false }),
      {},
    ),
  );

  const watchedFields = useWatch();

  useFilteredFields(watchedFields, setActiveFilters);

  const rows: IProjectDoc[] = data
    .filter((p) => p.projectType === projectType)
    .filter((r) => filterByFilterPanel(r, watchedFields as any)) //TODO: fix that type assertion
    .filter((r) =>
      filterBySearch(r, projectTableSearchFields as any, searchValue),
    );
  return (
    <Table
      tableFilterProps={{
        filters: projectsTableFilters,
        displayTexts: PROJECT_DISPLAY_TEXTS.he.fields,
        status: EProjectStatus,
        activeFilters,
      }}
      loading={isLoading}
      rows={rows}
      columns={projectsTableColumns as any} //TODO: fix this type assertion
      totals={{
        [EProjectFields.Title]:
          rows.length < 2
            ? '-'
            : `${rows.length.toLocaleString()} ${
                DISPLAY_TEXTS.he.routeNames[ERoutesNames.ProjectsWithType]
              }`,
        [EProjectFields.TotalAgreementSum]: sumBy(
          rows,
          EProjectFields.TotalAgreementSum,
        ),
        [EProjectFields.TotalActualsSum]: sumBy(
          rows,
          EProjectFields.TotalActualsSum,
        ),
      }}
      onRowClick={({ id }) =>
        router.push({
          pathname: ERoutesNames.Project,
          query: { projectId: id, projectType },
        })
      }
    />
  );
};
