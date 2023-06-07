import {
  CONTRACTS_DISPLAY_TEXTS,
  IContractActualStatus,
  IContractStatus,
  IContractType,
} from '@/lib/consts/contracts';
import { IDropdownInputProps } from '../commons/Input/inputs/DropdownInput';

export const CONTRACT_FORM_DEFAULT_VALUES = {};

export const IS_INDEXED_OPTIONS: IDropdownInputProps['options'] = [
  { value: true, text: 'Yes' },
  { value: false, text: 'No' },
];

export const CONTRACT_STATUS_OPTIONS: IDropdownInputProps['options'] =
  Object.values(IContractStatus).map((value) => ({
    value,
    text: CONTRACTS_DISPLAY_TEXTS.he.contractStatus[value],
  }));

export const CONTRACT_ACTUALS_STATUS_OPTIONS: IDropdownInputProps['options'] =
  Object.values(IContractActualStatus).map((value) => ({
    value,
    text: CONTRACTS_DISPLAY_TEXTS.he.contractActualsStatus[value],
  }));

export const CONTRACT_TYPE_OPTIONS: IDropdownInputProps['options'] =
  Object.values(IContractType).map((value) => ({
    value,
    text: CONTRACTS_DISPLAY_TEXTS.he.contractType[value],
  }));
