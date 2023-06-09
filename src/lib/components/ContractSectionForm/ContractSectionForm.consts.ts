import {
  ESectionCalculationMethod,
  ESectionCalculationType,
  SECTIONS_DISPALY_TEXTS,
  SectionDoc,
} from '@/lib/consts/sections';
import { IDropdownInputProps } from '../commons/Input/inputs/DropdownInput';
import { z } from 'zod';
import { IMilestoneDoc, MilestoneDoc } from '@/lib/consts/milestones';
import { DefaultValues } from 'react-hook-form';
import { ISectionFormValues } from './ContractSectionForm.types';

export const SectionFormShape = SectionDoc.merge(
  z.object({ milestones: z.array(MilestoneDoc) }),
);

export const CONTRACT_SECTION_FORM_DEFAULT_VALUES: DefaultValues<ISectionFormValues> =
  {
    title: '',
    milestones: [],
  };
export const EMPTY_MILESONE_DEFAULT_VALUES: Omit<IMilestoneDoc, 'id'> = {
  title: '----',
  orderIndex: 0,
  price: 0,
  totalDone: 0,
  weight: 0,
};

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
