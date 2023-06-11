import { IProjectConfirmsProps } from './ProjectConfirms.types';
import { ITableColumn, Table } from '@/lib/components/commons/Table';
import { PROJECT_ACCOUNTS_DISPLAY_TEXTS } from '@/lib/consts/accounts';
import { IAccountConfirms } from '@/lib/consts/accounts/AccountConfirms';
import { FALLBACK_BROKEN_REF_TEXT } from '@/lib/consts/fallbackText';
import { VENDOR_DISPLAY_TEXTS, IVendorFields } from '@/lib/consts/vendors';
import { useProjectContractsContext } from '@/lib/context/projectContractsContext';
import { useVendorsContext } from '@/lib/context/vendorsContext';
import {
  CONTRACT_ACTUALS_STATUS_OPTIONS,
  CONTRACT_STATUS_OPTIONS,
} from '../ProjectContracts';
import {
  CONTRACTS_DISPLAY_TEXTS,
  IContractFields,
} from '@/lib/consts/contracts';
import { useRouter } from 'next/router';
import {
  CONTRACT_ID_QUERY,
  IRoutesNames,
  PROJECT_ID_QUERY,
  PROJECT_TYPE_QUERY,
} from '@/lib/consts/routes';
import { queryParamToString } from '@/lib/utils/queryParamToString';

export const ProjectConfirms = (_: IProjectConfirmsProps) => {
  const { data: contracts, isLoading } = useProjectContractsContext();
  const { data: vendors } = useVendorsContext();
  const router = useRouter();
  const projectId = queryParamToString(router.query, PROJECT_ID_QUERY);
  const projectType = queryParamToString(router.query, PROJECT_TYPE_QUERY);

  const projectConfirmsColumns: ITableColumn<
    IContractFields | IAccountConfirms
  >[] = [
    {
      field: IContractFields.Title,
      display: CONTRACTS_DISPLAY_TEXTS.he.fields[IContractFields.Title],
    },
    {
      field: IContractFields.Status,
      display: CONTRACTS_DISPLAY_TEXTS.he.fields[IContractFields.Status],
      type: 'list',
      options: CONTRACT_STATUS_OPTIONS,
    },
    {
      field: IContractFields.VendorRef,
      fieldPath: `${IContractFields.VendorRef}.${IVendorFields.Title}`,
      display: CONTRACTS_DISPLAY_TEXTS.he.fields[IContractFields.VendorRef],
      getValue: ({ row }) =>
        vendors.find((vendor) => vendor.id === row.vendorRef)?.[
          IVendorFields.Title
        ] ?? FALLBACK_BROKEN_REF_TEXT,
    },
    {
      field: IContractFields.VendorRef,
      fieldPath: `${IContractFields.VendorRef}.${IVendorFields.CompanExternalNumber}`,
      display:
        VENDOR_DISPLAY_TEXTS.he.fields[IVendorFields.CompanExternalNumber],
      getValue: ({ row }) =>
        vendors.find((vendor) => vendor.id === row.vendorRef)?.[
          IVendorFields.CompanExternalNumber
        ] ?? FALLBACK_BROKEN_REF_TEXT,
    },
    {
      field: IContractFields.CurrentAccountPeriod,
      display:
        CONTRACTS_DISPLAY_TEXTS.he.fields[IContractFields.CurrentAccountPeriod],
    },
    {
      field: IAccountConfirms.Start,
      display:
        PROJECT_ACCOUNTS_DISPLAY_TEXTS.he.confirms[IAccountConfirms.Start],
    },
    {
      field: IAccountConfirms.Projectmanager,
      display:
        PROJECT_ACCOUNTS_DISPLAY_TEXTS.he.confirms[
          IAccountConfirms.Projectmanager
        ],
    },
    {
      field: IAccountConfirms.Manager,
      display:
        PROJECT_ACCOUNTS_DISPLAY_TEXTS.he.confirms[IAccountConfirms.Manager],
    },
    {
      field: IAccountConfirms.Accounting,
      display:
        PROJECT_ACCOUNTS_DISPLAY_TEXTS.he.confirms[IAccountConfirms.Accounting],
    },
    {
      field: IAccountConfirms.Financing,
      display:
        PROJECT_ACCOUNTS_DISPLAY_TEXTS.he.confirms[IAccountConfirms.Financing],
    },
    {
      field: IAccountConfirms.ExternalSoftware,
      display:
        PROJECT_ACCOUNTS_DISPLAY_TEXTS.he.confirms[
          IAccountConfirms.ExternalSoftware
        ],
    },
    {
      field: IAccountConfirms.Billing,
      display:
        PROJECT_ACCOUNTS_DISPLAY_TEXTS.he.confirms[IAccountConfirms.Billing],
    },
    {
      field: IContractFields.ActualsStatus,
      display: CONTRACTS_DISPLAY_TEXTS.he.fields[IContractFields.ActualsStatus],
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
          pathname: IRoutesNames.Contract,
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
