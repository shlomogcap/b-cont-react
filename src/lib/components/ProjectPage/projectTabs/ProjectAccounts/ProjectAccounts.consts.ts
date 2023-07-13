import {
  EFilterItemType,
  IFilterItem,
} from '@/lib/components/commons/FilterPanel';
import { dateFilterSchema } from '@/lib/components/commons/FilterPanel/FilterPanel.consts';
import { EProjectAccountsFields } from '@/lib/consts/accounts';
import { EProjectFields } from '@/lib/consts/projects';
import { z } from 'zod';

export const projectAccountsFilterSchema = z.object({
  // [EProjectFields.Status]: z.object({
  //   type: z.literal(EFilterItemType.Buttons),
  //   value: z.array(z.nativeEnum(EContractStatus)),
  // }),
  [EProjectFields.SDate]: z.object({
    type: z.literal(EFilterItemType.Date),
    value: dateFilterSchema,
  }),
  // [EProjectFields.EDate]: z.object({
  //   type: z.literal(EFilterItemType.Date),
  //   value: dateFilterSchema,
  // }),
});

export const projectAccountsTableFilters: IFilterItem<EProjectAccountsFields>[] =
  [
    // {
    //   type: EFilterItemType.Buttons,
    //   field: EProjectFields.Status,
    //   options: Object.values(EContractStatus).map((value) => ({
    //     value,
    //     text: CONTRACTS_DISPLAY_TEXTS.he.contractStatus[value],
    //   })),
    //   defaultValue: [EContractStatus.Plan],
    // },
    {
      type: EFilterItemType.Date,
      field: EProjectAccountsFields.AccountPeriod,
    },
    // {
    //   type: EFilterItemType.Date,
    //   field: EProjectFields.EDate,
    // },
  ];
