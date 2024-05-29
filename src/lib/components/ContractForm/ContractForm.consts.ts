import {
  CONTRACTS_DISPLAY_TEXTS,
  EContractActualStatus,
  EContractFields,
  EContractStatus,
  EContractType,
} from '@/lib/consts/contracts';
import { IDropdownInputProps } from '../commons/Input/inputs/DropdownInput';
import { DISPLAY_TEXTS, EBoolean } from '@/lib/consts/displayTexts';

export const CONTRACT_FORM_DEFAULT_VALUES = {
  [EContractFields.Status]: EContractStatus.Plan,
};

export const IS_INDEXED_OPTIONS: IDropdownInputProps['options'] = [
  { value: true, text: DISPLAY_TEXTS.he.boolean[EBoolean.True] },
  { value: false, text: DISPLAY_TEXTS.he.boolean[EBoolean.False] },
];

export const CONTRACT_STATUS_OPTIONS: IDropdownInputProps['options'] =
  Object.values(EContractStatus).map((value) => ({
    value,
    text: CONTRACTS_DISPLAY_TEXTS.he.contractStatus[value],
  }));

export const CONTRACT_ACTUALS_STATUS_OPTIONS: IDropdownInputProps['options'] =
  Object.values(EContractActualStatus).map((value) => ({
    value,
    text: CONTRACTS_DISPLAY_TEXTS.he.contractActualsStatus[value],
  }));

export const CONTRACT_TYPE_OPTIONS: IDropdownInputProps['options'] =
  Object.values(EContractType).map((value) => ({
    value,
    text: CONTRACTS_DISPLAY_TEXTS.he.contractType[value],
  }));
