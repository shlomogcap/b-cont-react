import { ITableColumnOption } from '@/lib/components/commons/Table';
import {
  CONTRACTS_DISPLAY_TEXTS,
  EContractActualStatus,
  EContractStatus,
  EContractType,
} from '@/lib/consts/contracts';

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
