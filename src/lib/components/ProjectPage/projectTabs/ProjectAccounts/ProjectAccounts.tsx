import { Table, fieldsNamesToColumns } from '@/lib/components/commons/Table';
import { IProjectAccountsProps } from './ProjectAccounts.types';
import {
  EProjectAccountsFields,
  PROJECT_ACCOUNTS_DISPLAY_TEXTS,
} from '@/lib/consts/accounts';
import { MOCK_PROJECTS_ACCOUNTS_DATA } from '@/lib/mock/projectAccounts';
import { useProjectContractsContext } from '@/lib/context/projectContractsContext';
import { FALLBACK_BROKEN_REF_TEXT } from '@/lib/consts/fallbackText';
import { useVendorsContext } from '@/lib/context/vendorsContext';

export const ProjectAccounts = (props: IProjectAccountsProps) => {
  const { data: contracts } = useProjectContractsContext();
  const { data: vendors } = useVendorsContext();
  return (
    <Table
      columns={fieldsNamesToColumns(
        [
          {
            field: EProjectAccountsFields.Contract,
            getValue: ({ row, field }) =>
              contracts.find(({ id }) => row[field] === id)?.title ??
              FALLBACK_BROKEN_REF_TEXT,
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
        PROJECT_ACCOUNTS_DISPLAY_TEXTS.he.fields,
      )}
      //TODO: model this data in database and resolve the data from there... (e.g. part of contract ?)
      rows={MOCK_PROJECTS_ACCOUNTS_DATA}
    />
  );
};
