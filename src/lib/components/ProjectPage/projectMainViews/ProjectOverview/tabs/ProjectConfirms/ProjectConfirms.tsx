import { IProjectConfirmsProps } from './ProjectConfirms.types';
import { ITableColumn, Table } from '@/lib/components/commons/Table';
import { PROJECT_ACCOUNTS_DISPLAY_TEXTS } from '@/lib/consts/accounts';
import { IAccountConfirms } from '@/lib/consts/accounts/AccountConfirms';
import { FALLBACK_BROKEN_REF_TEXT } from '@/lib/consts/fallbackText';
import { VENDOR_DISPLAY_TEXTS, VendorFields } from '@/lib/consts/vendors';
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

export const ProjectConfirms = (props: IProjectConfirmsProps) => {
  const { data: contracts, isLoading } = useProjectContractsContext();
  const { data: vendors } = useVendorsContext();

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
      fieldPath: `${IContractFields.VendorRef}.${VendorFields.Title}`,
      display: 'קבלן מבצע', //TODO: locate in DisplayText object
      getValue: ({ row }) =>
        vendors.find((vendor) => vendor.id === row.vendorRef)?.[
          VendorFields.Title
        ] ?? FALLBACK_BROKEN_REF_TEXT,
    },
    {
      field: IContractFields.VendorRef,
      fieldPath: `${IContractFields.VendorRef}.${VendorFields.CompanExternalNumber}`,
      display:
        VENDOR_DISPLAY_TEXTS.he.fields[VendorFields.CompanExternalNumber],
      getValue: ({ row }) =>
        vendors.find((vendor) => vendor.id === row.vendorRef)?.[
          VendorFields.CompanExternalNumber
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
    />
  );
};
