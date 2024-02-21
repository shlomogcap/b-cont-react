import {
  EFilterItemType,
  IFilterItem,
} from '@/lib/components/commons/FilterPanel';
import { ITableColumnOption } from '@/lib/components/commons/Table';
import {
  CONTRACTS_DISPLAY_TEXTS,
  EContractActualStatus,
  EContractFields,
  EContractStatus,
  EContractType,
} from '@/lib/consts/contracts';
import { z } from 'zod';

export const CONTRACT_STATUS_OPTIONS: ITableColumnOption[] = [
  EContractStatus.Active,
  EContractStatus.NonActive,
].map((contractStatus) => ({
  text: CONTRACTS_DISPLAY_TEXTS.he.contractStatus[contractStatus],
  value: contractStatus,
}));

export const CONTRACT_ACTUALS_STATUS_OPTIONS: ITableColumnOption[] =
  Object.values(EContractActualStatus).map((status) => ({
    text: CONTRACTS_DISPLAY_TEXTS.he.contractActualsStatus[status],
    value: status,
  }));

export const CONTRACT_TYPE_OPTIONS: ITableColumnOption[] = Object.values(
  EContractType,
).map((contractType) => ({
  text: CONTRACTS_DISPLAY_TEXTS.he.contractType[contractType],
  value: contractType,
}));

export const projectContractsFilterSchema = z.object({
  [EContractFields.Status]: z.object({
    type: z.literal(EFilterItemType.Buttons),
    value: z.array(z.nativeEnum(EContractStatus)),
  }),
  [EContractFields.ContractType]: z.object({
    type: z.literal(EFilterItemType.Buttons),
    value: z.array(z.nativeEnum(EContractStatus)),
  }),
});

export const projectContractsTableFilters: IFilterItem<EContractFields>[] = [
  {
    type: EFilterItemType.Buttons,
    field: EContractFields.Status,
    isSingleOption: false,
    options: Object.values(EContractStatus).map((value) => ({
      value,
      text: CONTRACTS_DISPLAY_TEXTS.he.contractStatus[value],
    })),
    defaultValue: [EContractStatus.Plan],
  },
  {
    type: EFilterItemType.Buttons,
    field: EContractFields.ContractType,
    isSingleOption: false,
    options: Object.values(EContractType).map((value) => ({
      value,
      text: CONTRACTS_DISPLAY_TEXTS.he.contractType[value],
    })),
    defaultValue: [...Object.values(EContractType)],
  },
];
