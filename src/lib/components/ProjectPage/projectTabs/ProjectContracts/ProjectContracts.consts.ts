import { ITableColumnOption } from '@/lib/components/commons/Table';
import {
  CONTRACTS_DISPLAY_TEXTS,
  IContractActualStatus,
  IContractStatus,
  IContractType,
} from '@/lib/consts/contracts';

export const CONTRACT_STATUS_OPTIONS: ITableColumnOption[] = [
  IContractStatus.Active,
  IContractStatus.NonActive,
].map((contractStatus) => ({
  text: CONTRACTS_DISPLAY_TEXTS.he.contractStatus[contractStatus],
  value: contractStatus,
}));

export const CONTRACT_ACTUALS_STATUS_OPTIONS: ITableColumnOption[] =
  Object.values(IContractActualStatus).map((status) => ({
    text: CONTRACTS_DISPLAY_TEXTS.he.contractActualsStatus[status],
    value: status,
  }));

export const CONTRACT_TYPE_OPTIONS: ITableColumnOption[] = Object.values(
  IContractType,
).map((contractType) => ({
  text: CONTRACTS_DISPLAY_TEXTS.he.contractType[contractType],
  value: contractType,
}));
