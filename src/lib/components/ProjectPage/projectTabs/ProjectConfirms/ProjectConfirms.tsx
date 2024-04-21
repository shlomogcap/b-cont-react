import {
  IProjectConfirmsFilterDoc,
  IProjectConfirmsProps,
} from './ProjectConfirms.types';
import {
  ITableColumn,
  Table,
  getDisplayValue,
} from '@/lib/components/commons/Table';
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
import { useProjectConfirmsSettingsContext } from '@/lib/context/projectConfirmsSettingsContext';
import { EConfirmFields } from '@/lib/consts/confirms/ConfirmFields';
import { sortBy } from 'lodash-es';
import { EAccountFields } from '@/lib/consts/accounts/AccountFields';

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
  const {
    data: { contracts, contractAccountMap },
    isLoading,
  } = useProjectContractsContext();
  const { data: confirms } = useProjectConfirmsSettingsContext();
  const { data: vendors } = useVendorsContext();
  const router = useRouter();
  const projectId = queryParamToString(router.query, PROJECT_ID_QUERY);
  const projectType = queryParamToString(router.query, PROJECT_TYPE_QUERY);

  const confirmsTableColumns: ITableColumn<EContractFields>[] = [
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
      getValue: ({ row }) =>
        contractAccountMap[String(row.path)]?.[0]?.[EAccountFields.Period],
    },
    ...sortBy(confirms, EConfirmFields.OrderIndex).map(
      (c) =>
        ({
          field: c.id as any,
          display: c.title,
          getValue: ({ row }) => {
            const currentAccount = contractAccountMap[String(row.path)]?.[0];
            return currentAccount?.[EAccountFields.ConfirmFlow]?.find(
              (confirm) => confirm.id === c.id,
            )?.approvedAt;
          },
          type: 'date',
          options: {
            format: 'DD/MM/YY',
          },
          getTooltipContent: ({ row }) => {
            const currentAccount = contractAccountMap[String(row.path)]?.[0];
            const currentConfirm = currentAccount?.[
              EAccountFields.ConfirmFlow
            ]?.find((confirm) => confirm.id === c.id);
            return currentConfirm?.approvedAt
              ? [
                  `Approved By: ${currentConfirm?.approvedBy}`,
                  `Approved At: ${getDisplayValue({
                    value: currentConfirm.approvedAt,
                    type: 'date',
                    options: { format: 'DD/MM/YYYY HH:mm:ss' },
                  })}`,
                ].join('\n')
              : '';
          },
        } as ITableColumn<any>),
    ),
    {
      field: EContractFields.ActualsStatus,
      display: CONTRACTS_DISPLAY_TEXTS.he.fields[EContractFields.ActualsStatus],
      type: 'list',
      options: CONTRACT_ACTUALS_STATUS_OPTIONS,
    },
  ];

  const [activeFilters, setActiveFilters] = useState(
    Object.values(confirmsTableColumns).reduce(
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
      columns={confirmsTableColumns as ITableColumn<EContractFields>[]}
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
        displayTexts: CONTRACTS_DISPLAY_TEXTS.he.fields,
        status: EContractStatus,
        activeFilters,
      }}
    />
  );
};
