import { Table, fieldsNamesToColumns } from '@/lib/components/commons/Table';
import { IProjectAccountsProps } from './ProjectAccounts.types';
import {
  IProjectAccountsFields,
  PROJECT_ACCOUNTS_DISPLAY_TEXTS,
} from '@/lib/consts/projectAccounts';
import { MOCK_PROJECTS_ACCOUNTS_DATA } from '@/lib/mock/projectAccounts';

export const ProjectAccounts = (props: IProjectAccountsProps) => {
  return (
    <Table
      columns={fieldsNamesToColumns(
        [
          IProjectAccountsFields.Contract,
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
      rows={MOCK_PROJECTS_ACCOUNTS_DATA}
    />
  );
};
