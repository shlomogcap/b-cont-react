import { ITableColumnOption } from '@/lib/components/commons/Table';
import {
  CONTRACTS_DISPLAY_TEXTS,
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

export const CONTRACT_TYPE_OPTIONS: ITableColumnOption[] = [
  IContractType.Pauschal,
  IContractType.Amount,
  IContractType.Rent,
  IContractType.Invoice,
  IContractType.Kitchen,
].map((contractType) => ({
  text: CONTRACTS_DISPLAY_TEXTS.he.contractType[contractType],
  value: contractType,
}));
