import { Table, fieldsNamesToColumns } from '@/lib/components/commons/Table';
import {
  IProjectContractsFilterDoc,
  IProjectContractsProps,
} from './ProjectContracts.types';
import {
  CONTRACTS_DISPLAY_TEXTS,
  EContractFields,
  EContractStatus,
} from '@/lib/consts/contracts';
import { useProjectContractsContext } from '@/lib/context/projectContractsContext';
import { useVendorsContext } from '@/lib/context/vendorsContext';
import { FALLBACK_BROKEN_REF_TEXT } from '@/lib/consts/fallbackText';
import {
  CONTRACT_STATUS_OPTIONS,
  CONTRACT_TYPE_OPTIONS,
  projectContractsFilterSchema,
  projectContractsTableFilters,
} from './ProjectContracts.consts';
import { useRouter } from 'next/router';
import {
  CONTRACT_ID_QUERY,
  ERoutesNames,
  PROJECT_ID_QUERY,
  PROJECT_TYPE_QUERY,
} from '@/lib/consts/routes';
import { queryParamToString } from '@/lib/utils/queryParamToString';
import {
  filterByFilterPanel,
  filterBySearch,
  getDefaultFilterValues,
} from '@/lib/components/commons/FilterPanel';
import { useWatch } from 'react-hook-form';
import { useSearchableContext } from '@/lib/components/commons/SearchBar/searchableContext';
import { useFilteredFields } from '@/lib/hooks/useFilteredFields';
import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export const ProjectContracts = (props_: IProjectContractsProps) => {
  const form = useForm<IProjectContractsFilterDoc>({
    resolver: zodResolver(projectContractsFilterSchema),
    defaultValues: getDefaultFilterValues(projectContractsTableFilters),
    mode: 'onSubmit',
  });
  return (
    <FormProvider {...form}>
      <ProjectContractsInner />
    </FormProvider>
  );
};

const ProjectContractsInner = (props_: IProjectContractsProps) => {
  const { data: rows, isLoading } = useProjectContractsContext();
  const { data: vendors } = useVendorsContext();
  const router = useRouter();
  const projectId = queryParamToString(router.query, PROJECT_ID_QUERY);
  const projectType = queryParamToString(router.query, PROJECT_TYPE_QUERY);

  const columns = fieldsNamesToColumns(
    [
      EContractFields.Title,
      {
        field: EContractFields.Status,
        type: 'list',
        options: CONTRACT_STATUS_OPTIONS,
      },
      {
        field: EContractFields.VendorRef,
        getValue: ({ row, field }) =>
          vendors.find(({ id }) => row[field] === id)?.title ??
          FALLBACK_BROKEN_REF_TEXT,
      },
      EContractFields.BudgetbudgetaryItem,
      { field: EContractFields.TotalAgreementSum, type: 'number' },
      {
        field: EContractFields.ContractType,
        type: 'list',
        options: CONTRACT_TYPE_OPTIONS,
      },
    ],
    CONTRACTS_DISPLAY_TEXTS.he.fields,
  );
  console.log(columns);
  const [activeFilters, setActiveFilters] = useState(
    Object.values(columns).reduce(
      (acc, curr) => ({ ...acc, [curr.fieldPath ?? curr.field]: false }),
      {},
    ),
  );

  const watchedFields = useWatch();
  useFilteredFields(watchedFields, setActiveFilters);
  const { searchValue } = useSearchableContext();
  const searchFields = [EContractFields.Title, EContractFields.VendorRef];
  const getVendorDetails = (ref: string) => {
    const vendor = vendors.find((vendor) => vendor.id === ref);
    if (!vendor) {
      return;
    }
    return [vendor.title, vendor.companExternalNumber];
  };

  return (
    <Table
      loading={isLoading}
      columns={columns}
      rows={rows
        .filter((r) => filterByFilterPanel(r, watchedFields as any))
        .filter((r) =>
          filterBySearch(r, searchFields, searchValue, getVendorDetails),
        )}
      onRowClick={({ id }) =>
        router.push({
          pathname: ERoutesNames.Contract,
          query: {
            [PROJECT_TYPE_QUERY]: projectType,
            [PROJECT_ID_QUERY]: projectId,
            [CONTRACT_ID_QUERY]: id,
          },
        })
      }
      tableFilterProps={{
        filters: projectContractsTableFilters,
        displayTexts: CONTRACTS_DISPLAY_TEXTS.he.fields,
        status: EContractStatus,
        activeFilters,
      }}
    />
  );
};
