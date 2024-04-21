import { z } from 'zod';
import {
  CONTRACTS_DISPLAY_TEXTS,
  EContractFields,
  EContractStatus,
  IContractDoc,
} from '@/lib/consts/contracts';
import { EProjectFields } from '@/lib/consts/projects';
import {
  EFilterItemType,
  IFilterItem,
} from '@/lib/components/commons/FilterPanel';
import { IContractLastAccountData } from '@/lib/context/projectContractsContext';
import { EProjectAccountsFields } from '@/lib/consts/accounts';
import { ITableRow } from '@/lib/components/commons/Table';
import { ECommonFields } from '@/lib/consts/commonFields';
import { sumBy } from 'lodash-es';
import { EAccountFields } from '@/lib/consts/accounts/AccountFields';

export const projectConfirmsFilterSchema = z.object({
  [EProjectFields.Status]: z.object({
    type: z.literal(EFilterItemType.Buttons),
    value: z.array(z.nativeEnum(EContractStatus)),
  }),
  // [EProjectFields.SDate]: z.object({
  //   type: z.literal(EFilterItemType.Date),
  //   value: dateFilterSchema,
  // }),
  // [EProjectFields.EDate]: z.object({
  //   type: z.literal(EFilterItemType.Date),
  //   value: dateFilterSchema,
  // }),
});

export const projectConfirmsTableFilters: IFilterItem<EProjectFields>[] = [
  {
    type: EFilterItemType.Buttons,
    field: EProjectFields.Status,
    options: Object.values(EContractStatus).map((value) => ({
      value,
      text: CONTRACTS_DISPLAY_TEXTS.he.contractStatus[value],
    })),
    defaultValue: [EContractStatus.Plan],
  },
  // {
  //   type: EFilterItemType.Date,
  //   field: EProjectFields.SDate,
  // },
  // {
  //   type: EFilterItemType.Date,
  //   field: EProjectFields.EDate,
  // },
];

type IPrepareProjectAccountsRowsArgs = {
  contractAccountMap: IContractLastAccountData;
  contracts: IContractDoc[];
};
export const prepareProjectAccountsRows = ({
  contractAccountMap,
  contracts,
}: IPrepareProjectAccountsRowsArgs): ITableRow<EProjectAccountsFields>[] => {
  const rawData = Object.entries(contractAccountMap).map(
    ([contractPath, [lastAccount, ...historyAccounts]]) => ({
      lastAccount,
      historyAccounts,
      contract:
        contracts.find((c) => c.path === contractPath) ?? ({} as IContractDoc),
    }),
  );
  return rawData.map((data) => ({
    [ECommonFields.Id]: data.contract[ECommonFields.Id],
    [EProjectAccountsFields.Contract]: data.contract[EContractFields.Title],
    [EProjectAccountsFields.Vendor]: data.contract[EContractFields.VendorRef],
    [EProjectAccountsFields.AccumulatedTotal]:
      data.contract[EContractFields.TotalActualsSum],
    [EProjectAccountsFields.AccumulatedHisotry]:
      sumBy(data.historyAccounts, EAccountFields.AccumulatedTotal) ?? 0,
    [EProjectAccountsFields.AccountAdditions]:
      data.lastAccount[EAccountFields.TotalAdditions],
    [EProjectAccountsFields.AccountSubtractions]:
      data.lastAccount[EAccountFields.TotalSubtractions],
    [EProjectAccountsFields.AccountPeriod]:
      data.lastAccount[EAccountFields.Period],
    [EProjectAccountsFields.AccountToPay]:
      data.lastAccount[EAccountFields.TotalAccountToPay],
    [EProjectAccountsFields.ContractSum]:
      data.contract[EContractFields.TotalAgreementSum],
    [EProjectAccountsFields.TotalAdditionsSubtractions]: 0, //TODO:
    [EProjectAccountsFields.TotalToPay]: 0, //TODO:
    [EProjectAccountsFields.PaidPercentage]: 0, //TODO:
  }));
};
