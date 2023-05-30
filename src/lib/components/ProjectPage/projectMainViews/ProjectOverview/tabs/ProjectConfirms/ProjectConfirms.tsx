import { IProjectConfirmsProps } from './ProjectConfirms.types';
import { ITableColumn, Table } from '@/lib/components/commons/Table';
import { PROJECT_ACCOUNTS_DISPLAY_TEXTS } from '@/lib/consts/accounts';
import { IAccountConfirms } from '@/lib/consts/accounts/AccountConfirms';
import { FALLBACK_BROKEN_REF_TEXT } from '@/lib/consts/fallbackText';
import { VendorFields } from '@/lib/consts/vendors';
import { useProjectContractsContext } from '@/lib/context/projectContractsContext';
import { useVendorsContext } from '@/lib/context/vendorsContext';
import {
  CONTRACT_ACTUALS_STATUS_OPTIONS,
  CONTRACT_STATUS_OPTIONS,
} from '../ProjectContracts';

export const ProjectConfirms = (props: IProjectConfirmsProps) => {
  const { data: contracts, isLoading } = useProjectContractsContext();
  const { data: vendors } = useVendorsContext();
  return (
    <Table
      loading={isLoading}
      columns={
        [
          { field: 'title', display: 'חוזה' },
          {
            field: 'status',
            display: 'סטטוס',
            type: 'list',
            options: CONTRACT_STATUS_OPTIONS,
          },
          {
            field: 'vendorRef.title',
            display: 'קבלן מבצע',
            getValue: ({ row }) =>
              vendors.find((vendor) => vendor.id === row.vendorRef)?.[
                VendorFields.Title
              ] ?? FALLBACK_BROKEN_REF_TEXT,
          },
          {
            field: 'vendorRef.companExternalNumber',
            display: 'קוד בסאפ',
            getValue: ({ row }) =>
              vendors.find((vendor) => vendor.id === row.vendorRef)?.[
                VendorFields.CompanExternalNumber
              ] ?? FALLBACK_BROKEN_REF_TEXT,
          },
          { field: 'currentAccountPeriod', display: 'חשבון נוכחי' },
          {
            field: IAccountConfirms.Start,
            display:
              PROJECT_ACCOUNTS_DISPLAY_TEXTS.he.confirms[
                IAccountConfirms.Start
              ],
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
              PROJECT_ACCOUNTS_DISPLAY_TEXTS.he.confirms[
                IAccountConfirms.Manager
              ],
          },
          {
            field: IAccountConfirms.Accounting,
            display:
              PROJECT_ACCOUNTS_DISPLAY_TEXTS.he.confirms[
                IAccountConfirms.Accounting
              ],
          },
          {
            field: IAccountConfirms.Financing,
            display:
              PROJECT_ACCOUNTS_DISPLAY_TEXTS.he.confirms[
                IAccountConfirms.Financing
              ],
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
              PROJECT_ACCOUNTS_DISPLAY_TEXTS.he.confirms[
                IAccountConfirms.Billing
              ],
          },
          {
            field: 'actualsStatus',
            display: 'הערות תהליך',
            type: 'list',
            options: CONTRACT_ACTUALS_STATUS_OPTIONS,
          },
        ] as ITableColumn<any>[]
      }
      rows={contracts}
    />
  );
};
