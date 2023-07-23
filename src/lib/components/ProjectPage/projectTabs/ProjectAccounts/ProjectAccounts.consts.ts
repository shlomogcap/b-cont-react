import {
  EFilterItemType,
  IFilterItem,
} from '@/lib/components/commons/FilterPanel';
import { dateFilterSchema } from '@/lib/components/commons/FilterPanel/FilterPanel.consts';
import { EProjectAccountsFields } from '@/lib/consts/accounts';
import { EProjectFields } from '@/lib/consts/projects';
import { z } from 'zod';

export const projectAccountsFilterSchema = z.object({
  [EProjectFields.SDate]: z.object({
    type: z.literal(EFilterItemType.Date),
    value: dateFilterSchema,
  }),
});

export const projectAccountsTableFilters: IFilterItem<EProjectAccountsFields>[] =
  [
    {
      type: EFilterItemType.Date,
      field: EProjectAccountsFields.AccountPeriod,
    },
  ];
