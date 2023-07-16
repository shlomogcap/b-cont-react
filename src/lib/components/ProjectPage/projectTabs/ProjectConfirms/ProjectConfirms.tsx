import { IProjectConfirmsProps } from './ProjectConfirms.types';
import { ITableColumn, Table } from '@/lib/components/commons/Table';
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
} from '@/lib/consts/contracts';
import { useRouter } from 'next/router';
import {
  CONTRACT_ID_QUERY,
  ERoutesNames,
  PROJECT_ID_QUERY,
  PROJECT_TYPE_QUERY,
} from '@/lib/consts/routes';
import { queryParamToString } from '@/lib/utils/queryParamToString';
import { useProjectConfirmsSettingsContext } from '@/lib/context/projectConfirmsSettingsContext';
import { sortBy } from 'lodash-es';
import { EConfirmFields } from '@/lib/consts/confirms/ConfirmFields';

export const ProjectConfirms = (_: IProjectConfirmsProps) => {
  const { data: contracts, isLoading } = useProjectContractsContext();
  const { data: confirms } = useProjectConfirmsSettingsContext();
  const { data: vendors } = useVendorsContext();
  const router = useRouter();
  const projectId = queryParamToString(router.query, PROJECT_ID_QUERY);
  const projectType = queryParamToString(router.query, PROJECT_TYPE_QUERY);
  const projectConfirmsColumns: ITableColumn<EContractFields>[] = [
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
    ...sortBy(confirms, EConfirmFields.OrderIndex).map((c) => ({
      field: c.id as any,
      display: c.title,
    })),
    {
      field: EContractFields.ActualsStatus,
      display: CONTRACTS_DISPLAY_TEXTS.he.fields[EContractFields.ActualsStatus],
      type: 'list',
      options: CONTRACT_ACTUALS_STATUS_OPTIONS,
    },
  ];

  return (
    <Table
      loading={isLoading}
      columns={projectConfirmsColumns}
      rows={contracts}
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
    />
  );
};
