import { ITableRow } from '../components/commons/Table';
import { ID_FIELD } from '../consts/commonFields';
import { IProjectAccountsFields } from '../consts/projectAccounts';

export const MOCK_PROJECTS_ACCOUNTS_DATA: ITableRow<IProjectAccountsFields>[] =
  [
    {
      [ID_FIELD]: '1',
      [IProjectAccountsFields.Contract]: '1',
      [IProjectAccountsFields.Vendor]: '1',
      [IProjectAccountsFields.AccumulatedTotal]: 63_000,
      [IProjectAccountsFields.AccumulatedHisotry]: 0,
      [IProjectAccountsFields.AccountAdditions]: 0,
      [IProjectAccountsFields.AccountSubtractions]: 0,
      [IProjectAccountsFields.AccountPeriod]: '04 2023',
      [IProjectAccountsFields.AccountToPay]: 63_000,
      [IProjectAccountsFields.ContractSum]: 119_000,
      [IProjectAccountsFields.TotalAdditionsSubtractions]: 0,
      [IProjectAccountsFields.TotalToPay]: 56_000,
      [IProjectAccountsFields.PaidPercentage]: 0.53,
    },
    {
      [ID_FIELD]: '2',
      [IProjectAccountsFields.Contract]: '2',
      [IProjectAccountsFields.Vendor]: '2',
      [IProjectAccountsFields.AccumulatedTotal]: 120_425,
      [IProjectAccountsFields.AccumulatedHisotry]: 34_220,
      [IProjectAccountsFields.AccountAdditions]: 0,
      [IProjectAccountsFields.AccountSubtractions]: 0,
      [IProjectAccountsFields.AccountPeriod]: '01 2023',
      [IProjectAccountsFields.AccountToPay]: 86_205,
      [IProjectAccountsFields.ContractSum]: 82_000,
      [IProjectAccountsFields.TotalAdditionsSubtractions]: 48_707,
      [IProjectAccountsFields.TotalToPay]: -38_425,
      [IProjectAccountsFields.PaidPercentage]: 1.47,
    },
  ];
