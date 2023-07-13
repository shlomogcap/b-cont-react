import { z } from 'zod';
import {
  CONTRACTS_DISPLAY_TEXTS,
  EContractStatus,
} from '@/lib/consts/contracts';
import { EProjectFields } from '@/lib/consts/projects';
import {
  EFilterItemType,
  IFilterItem,
} from '@/lib/components/commons/FilterPanel';

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
