import { Table, fieldsNamesToColumns } from '@/lib/components/commons/Table';
import { IProjectAccountsProps } from './ProjectAccounts.types';
import {
  IProjectAccountsFields,
  PROJECT_ACCOUNTS_DISPLAY_TEXTS,
} from '@/lib/consts/projectAccounts';
import { MOCK_PROJECTS_ACCOUNTS_DATA } from '@/lib/mock/projectAccounts';
import { useProjectContractsContext } from '@/lib/context/projectContractsContext';
import { FALLBACK_BROKEN_REF_TEXT } from '@/lib/consts/fallbackText';

export const ProjectAccounts = (props: IProjectAccountsProps) => {
  const { data: contracts } = useProjectContractsContext();
  return (
    <Table
      columns={fieldsNamesToColumns(
        [
          {
            field: IProjectAccountsFields.Contract,
            getValue: ({ row, field }) =>
              contracts.find(({ id }) => row[field] === id)?.title ??
              FALLBACK_BROKEN_REF_TEXT,
          },
          IProjectAccountsFields.Vendor,
          { field: IProjectAccountsFields.AccumulatedTotal, type: 'number' },
          { field: IProjectAccountsFields.AccumulatedHisotry, type: 'number' },
          { field: IProjectAccountsFields.AccountAdditions, type: 'number' },
          { field: IProjectAccountsFields.AccountSubtractions, type: 'number' },
          IProjectAccountsFields.AccountPeriod,
          { field: IProjectAccountsFields.AccountToPay, type: 'number' },
          { field: IProjectAccountsFields.ContractSum, type: 'number' },
          {
            field: IProjectAccountsFields.TotalAdditionsSubtractions,
            type: 'number',
          },
          { field: IProjectAccountsFields.TotalToPay, type: 'number' },
          { field: IProjectAccountsFields.PaidPercentage, type: 'percentage' },
        ],
        PROJECT_ACCOUNTS_DISPLAY_TEXTS.he.fields,
      )}
      //TODO: model this data in database and resolve the data from there... (e.g. part of contract ?)
      rows={MOCK_PROJECTS_ACCOUNTS_DATA}
    />
  );
};
