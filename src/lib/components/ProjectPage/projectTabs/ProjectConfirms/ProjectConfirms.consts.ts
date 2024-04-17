import { z } from 'zod';
import {
  CONTRACTS_DISPLAY_TEXTS,
  EContractFields,
  EContractStatus,
} from '@/lib/consts/contracts';
import {
  EFilterItemType,
  IFilterItem,
} from '@/lib/components/commons/FilterPanel';
import { dateFilterSchema } from '@/lib/components/commons/FilterPanel/FilterPanel.consts';

export const projectConfirmsFilterSchema = z.object({
  [EContractFields.Status]: z.object({
    type: z.literal(EFilterItemType.Buttons),
    value: z.array(z.nativeEnum(EContractStatus)),
  }),
  [EContractFields.SWorkDate]: z.object({
    type: z.literal(EFilterItemType.Date),
    value: dateFilterSchema,
  }),
  [EContractFields.EWorkDate]: z.object({
    type: z.literal(EFilterItemType.Date),
    value: dateFilterSchema,
  }),
});

export const projectConfirmsTableFilters: IFilterItem<EContractFields>[] = [
  {
    type: EFilterItemType.Buttons,
    field: EContractFields.Status,
    isSingleOption: false,
    options: Object.values(EContractStatus).map((value) => ({
      value,
      text: CONTRACTS_DISPLAY_TEXTS.he.contractStatus[value],
    })),
    defaultValue: [EContractStatus.Plan, EContractStatus.Active],
  },
  {
    type: EFilterItemType.Date,
    field: EContractFields.SWorkDate,
  },
  {
    type: EFilterItemType.Date,
    field: EContractFields.EWorkDate,
  },
];
