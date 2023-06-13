import {
  ESectionCalculationMethod,
  ESectionCalculationType,
  SECTIONS_DISPALY_TEXTS,
} from '@/lib/consts/sections';
import { IDropdownInputProps } from '../commons/Input/inputs/DropdownInput';

export const CONTRACT_SECTION_FORM_DEFAULT_VALUES = {};

export const SECTION_CALULATION_METHOD_OPTIONS: IDropdownInputProps['options'] =
  Object.values(ESectionCalculationMethod).map((value) => ({
    value,
    text: SECTIONS_DISPALY_TEXTS.he.calculationMethod[value],
  }));

export const SECTION_CALULATION_TYPE_OPTIONS: IDropdownInputProps['options'] =
  Object.values(ESectionCalculationType).map((value) => ({
    value,
    text: SECTIONS_DISPALY_TEXTS.he.calculationType[value],
  }));
