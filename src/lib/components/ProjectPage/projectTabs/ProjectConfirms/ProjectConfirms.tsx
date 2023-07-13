import {
  IProjectConfirmsFilterDoc,
  IProjectConfirmsProps,
} from './ProjectConfirms.types';
import { ITableColumn, Table } from '@/lib/components/commons/Table';
import { PROJECT_ACCOUNTS_DISPLAY_TEXTS } from '@/lib/consts/accounts';
import { EAccountConfirms } from '@/lib/consts/accounts/AccountConfirms';
import { FALLBACK_BROKEN_REF_TEXT } from '@/lib/consts/fallbackText';
import { VENDOR_DISPLAY_TEXTS, EVendorFields } from '@/lib/consts/vendors';
import { useProjectContractsContext } from '@/lib/context/projectContractsContext';
import { useVendorsContext } from '@/lib/context/vendorsContext';
import {
  CONTRACT_ACTUALS_STATUS_OPTIONS,
  CONTRACT_STATUS_OPTIONS,
} from '../ProjectContracts';
import {
  CONTRACTS_DISPLAY_TEXTS,
  EContractFields,
  EContractStatus,
} from '@/lib/consts/contracts';
import { useRouter } from 'next/router';
import {
  CONTRACT_ID_QUERY,
  ERoutesNames,
  PROJECT_ID_QUERY,
  PROJECT_TYPE_QUERY,
} from '@/lib/consts/routes';
import { queryParamToString } from '@/lib/utils/queryParamToString';
import { useState } from 'react';
import { PROJECT_DISPLAY_TEXTS } from '@/lib/consts/projects';
import {
  filterByFilterPanel,
  filterBySearch,
  getDefaultFilterValues,
} from '@/lib/components/commons/FilterPanel';
import { useSearchableContext } from '@/lib/components/commons/SearchBar/searchableContext';
import { useFilteredFields } from '@/lib/hooks/useFilteredFields';
import {
  projectConfirmsFilterSchema,
  projectConfirmsTableFilters,
} from './ProjectConfirms.consts';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm, useWatch } from 'react-hook-form';

export const ProjectConfirms = (_: IProjectConfirmsProps) => {
  const form = useForm<IProjectConfirmsFilterDoc>({
    resolver: zodResolver(projectConfirmsFilterSchema),
    defaultValues: getDefaultFilterValues(projectConfirmsTableFilters),
    mode: 'onSubmit',
  });
  return (
    <FormProvider {...form}>
      <ProjectConfirmsInner />
    </FormProvider>
  );
};

const ProjectConfirmsInner = (_: IProjectConfirmsProps) => {
  const { data: contracts, isLoading } = useProjectContractsContext();
  const { data: vendors } = useVendorsContext();
  const router = useRouter();
  const projectId = queryParamToString(router.query, PROJECT_ID_QUERY);
  const projectType = queryParamToString(router.query, PROJECT_TYPE_QUERY);

  const projectConfirmsColumns: ITableColumn<
    EContractFields | EAccountConfirms
  >[] = [
    {
      field: EContractFields.Title,
      display: CONTRACTS_DISPLAY_TEXTS.he.fields[EContractFields.Title],
    },
    {
      field: EContractFields.Status,
      display: CONTRACTS_DISPLAY_TEXTS.he.fields[EContractFields.Status],
      type: 'list',
      options: CONTRACT_STATUS_OPTIONS,
    },
    {
      field: EContractFields.VendorRef,
      fieldPath: `${EContractFields.VendorRef}.${EVendorFields.Title}`,
      display: CONTRACTS_DISPLAY_TEXTS.he.fields[EContractFields.VendorRef],
      getValue: ({ row }) =>
        vendors.find((vendor) => vendor.id === row.vendorRef)?.[
          EVendorFields.Title
        ] ?? FALLBACK_BROKEN_REF_TEXT,
    },
    {
      field: EContractFields.VendorRef,
      fieldPath: `${EContractFields.VendorRef}.${EVendorFields.CompanExternalNumber}`,
      display:
        VENDOR_DISPLAY_TEXTS.he.fields[EVendorFields.CompanExternalNumber],
      getValue: ({ row }) =>
        vendors.find((vendor) => vendor.id === row.vendorRef)?.[
          EVendorFields.CompanExternalNumber
        ] ?? FALLBACK_BROKEN_REF_TEXT,
    },
    {
      field: EContractFields.CurrentAccountPeriod,
      display:
        CONTRACTS_DISPLAY_TEXTS.he.fields[EContractFields.CurrentAccountPeriod],
    },
    {
      field: EAccountConfirms.Start,
      display:
        PROJECT_ACCOUNTS_DISPLAY_TEXTS.he.confirms[EAccountConfirms.Start],
    },
    {
      field: EAccountConfirms.Projectmanager,
      display:
        PROJECT_ACCOUNTS_DISPLAY_TEXTS.he.confirms[
          EAccountConfirms.Projectmanager
        ],
    },
    {
      field: EAccountConfirms.Manager,
      display:
        PROJECT_ACCOUNTS_DISPLAY_TEXTS.he.confirms[EAccountConfirms.Manager],
    },
    {
      field: EAccountConfirms.Accounting,
      display:
        PROJECT_ACCOUNTS_DISPLAY_TEXTS.he.confirms[EAccountConfirms.Accounting],
    },
    {
      field: EAccountConfirms.Financing,
      display:
        PROJECT_ACCOUNTS_DISPLAY_TEXTS.he.confirms[EAccountConfirms.Financing],
    },
    {
      field: EAccountConfirms.ExternalSoftware,
      display:
        PROJECT_ACCOUNTS_DISPLAY_TEXTS.he.confirms[
          EAccountConfirms.ExternalSoftware
        ],
    },
    {
      field: EAccountConfirms.Billing,
      display:
        PROJECT_ACCOUNTS_DISPLAY_TEXTS.he.confirms[EAccountConfirms.Billing],
    },
    {
      field: EContractFields.ActualsStatus,
      display: CONTRACTS_DISPLAY_TEXTS.he.fields[EContractFields.ActualsStatus],
      type: 'list',
      options: CONTRACT_ACTUALS_STATUS_OPTIONS,
    },
  ];

  const [activeFilters, setActiveFilters] = useState(
    Object.values(projectConfirmsColumns).reduce(
      (acc, curr) => ({ ...acc, [curr.fieldPath ?? curr.field]: false }),
      {},
    ),
  );

  const watchedFields = useWatch();
  useFilteredFields(watchedFields, setActiveFilters);
  const { searchValue } = useSearchableContext();
  const searchFields = [EContractFields.Title, EContractFields.VendorRef];
  const getVendorName = (ref: string) => {
    const vendor = vendors.find((vendor) => vendor.id === ref);
    return vendor ? [vendor.title, vendor.companExternalNumber] : undefined;
  };
  const rows = contracts
    .filter((r) => filterByFilterPanel(r, watchedFields as any))
    .filter((r) => filterBySearch(r, searchFields, searchValue, getVendorName));

  return (
    <Table
      loading={isLoading}
      columns={projectConfirmsColumns}
      rows={rows}
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
        filters: projectConfirmsTableFilters,
        displayTexts: PROJECT_DISPLAY_TEXTS.he.fields,
        status: EContractStatus,
        activeFilters,
      }}
    />
  );
};
