import { Table, fieldsNamesToColumns } from '@/lib/components/commons/Table';
import {
  IProjectAccountsFilterDoc,
  IProjectAccountsProps,
} from './ProjectAccounts.types';
import {
  EProjectAccountsFields,
  PROJECT_ACCOUNTS_DISPLAY_TEXTS,
} from '@/lib/consts/accounts';
import { useProjectContractsContext } from '@/lib/context/projectContractsContext';
import { FALLBACK_BROKEN_REF_TEXT } from '@/lib/consts/fallbackText';
import { useVendorsContext } from '@/lib/context/vendorsContext';
import { useState } from 'react';
import { useWatch } from 'react-hook-form';
import { useFilteredFields } from '@/lib/hooks/useFilteredFields';
import { useSearchableContext } from '@/lib/components/commons/SearchBar/searchableContext';
import {
  filterByFilterPanel,
  filterBySearch,
  getDefaultFilterValues,
} from '@/lib/components/commons/FilterPanel';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  projectAccountsFilterSchema,
  projectAccountsTableFilters,
} from './ProjectAccounts.consts';
import { EContractStatus } from '@/lib/consts/contracts';
import { prepareProjectAccountsRows } from './ProjectAccounts.utils';

export const ProjectAccounts = (props: IProjectAccountsProps) => {
  const form = useForm<IProjectAccountsFilterDoc>({
    resolver: zodResolver(projectAccountsFilterSchema),
    defaultValues: getDefaultFilterValues(projectAccountsTableFilters),
    mode: 'onSubmit',
  });
  return (
    <FormProvider {...form}>
      <ProjectAccountsInner />
    </FormProvider>
  );
};

const ProjectAccountsInner = (props: IProjectAccountsProps) => {
  const {
    data: { contracts, contractAccountMap },
  } = useProjectContractsContext();
  const { data: vendors } = useVendorsContext();

  const projectAccountsColumns = fieldsNamesToColumns(
    [
      {
        field: EProjectAccountsFields.Contract,
      },
      {
        field: EProjectAccountsFields.Vendor,
        getValue: ({ row, field }) =>
          vendors.find(({ id }) => row[field] === id)?.title ??
          FALLBACK_BROKEN_REF_TEXT,
      },
      { field: EProjectAccountsFields.AccumulatedTotal, type: 'number' },
      { field: EProjectAccountsFields.AccumulatedHisotry, type: 'number' },
      { field: EProjectAccountsFields.AccountAdditions, type: 'number' },
      { field: EProjectAccountsFields.AccountSubtractions, type: 'number' },
      EProjectAccountsFields.AccountPeriod,
      { field: EProjectAccountsFields.AccountToPay, type: 'number' },
      { field: EProjectAccountsFields.ContractSum, type: 'number' },
      {
        field: EProjectAccountsFields.TotalAdditionsSubtractions,
        type: 'number',
      },
      { field: EProjectAccountsFields.TotalToPay, type: 'number' },
      { field: EProjectAccountsFields.PaidPercentage, type: 'percentage' },
    ],
    PROJECT_ACCOUNTS_DISPLAY_TEXTS.he.projectAccountReportFields,
  );
  const [activeFilters, setActiveFilters] = useState(
    Object.values(projectAccountsColumns).reduce(
      (acc, curr) => ({ ...acc, [curr.fieldPath ?? curr.field]: false }),
      {},
    ),
  );
  const watchedFields = useWatch();
  useFilteredFields(watchedFields, setActiveFilters);
  const { searchValue } = useSearchableContext();
  const searchFields = [EProjectAccountsFields.Contract];
  const getContract = (ref: string) => {
    const contract = contracts.find((vendor) => vendor.id === ref);
    if (!contract) {
      return;
    }
    return [contract.title];
  };
  const rows = prepareProjectAccountsRows({ contracts, contractAccountMap })
    .filter((r) => filterByFilterPanel(r, watchedFields as any))
    .filter((r) => filterBySearch(r, searchFields, searchValue, getContract));

  return (
    <Table
      columns={projectAccountsColumns}
      //TODO: model this data in database and resolve the data from there... (e.g. part of contract ?)
      rows={rows}
      tableFilterProps={{
        filters: projectAccountsTableFilters,
        displayTexts:
          PROJECT_ACCOUNTS_DISPLAY_TEXTS.he.projectAccountReportFields,
        status: EContractStatus,
        activeFilters,
      }}
    />
  );
};
