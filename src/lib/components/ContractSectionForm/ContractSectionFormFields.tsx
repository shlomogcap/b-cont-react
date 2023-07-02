import { useFieldArray, useFormContext } from 'react-hook-form';
import {
  IContractSectionFormFieldsProps,
  ISectionFormValues,
} from './ContractSectionForm.types';
import { ESectionFields, SECTIONS_DISPALY_TEXTS } from '@/lib/consts/sections';
import { StyledContractSectionFormFields } from './ContractSectionForm.styled';
import { DropdownInput, NumberInput, TextInput } from '../commons/Input';
import { Divider } from '../commons/Divider';
import {
  SECTION_CALULATION_METHOD_OPTIONS,
  SECTION_CALULATION_TYPE_OPTIONS,
} from './ContractSectionForm.consts';
import { EMilestoneFields } from '@/lib/consts/milestones';

const useCalcTotalSum = () => {
  const { setValue, watch } = useFormContext();
  return () => {
    const [price, amount] = watch([
      ESectionFields.ItemPrice,
      ESectionFields.ItemsCount,
    ]);
    if (price && amount) {
      setValue(ESectionFields.TotalSum, Number(price) * Number(amount));
    }
  };
};
const useCalcMilestonesPrice = () => {
  const { watch } = useFormContext();
  const { fields: milestones, update } = useFieldArray<ISectionFormValues>({
    name: 'milestones',
  });
  return () => {
    const price = watch(ESectionFields.ItemPrice);
    if (milestones.length === 1) {
      update(0, {
        ...milestones[0],
        [EMilestoneFields.Price]: price,
      });
    } else {
      milestones.forEach((ms, ind, arr) => {
        update(ind, {
          ...ms,
          [EMilestoneFields.Price]:
            Number(ms[EMilestoneFields.Price]) / arr.length,
        });
      });
    }
  };
};

export const ContractSectionFormFields = ({
  workspacesOptions,
}: IContractSectionFormFieldsProps) => {
  const calcTotalSum = useCalcTotalSum();
  const calcMilestonesPrice = useCalcMilestonesPrice();
  return (
    <StyledContractSectionFormFields>
      <DropdownInput
        options={workspacesOptions}
        label={SECTIONS_DISPALY_TEXTS.he.fields[ESectionFields.WorkspaceRef]}
        name={ESectionFields.WorkspaceRef}
      />
      <Divider />
      <TextInput
        isRequired
        label={SECTIONS_DISPALY_TEXTS.he.fields[ESectionFields.Title]}
        name={ESectionFields.Title}
      />
      <DropdownInput
        isRequired
        options={SECTION_CALULATION_METHOD_OPTIONS}
        label={
          SECTIONS_DISPALY_TEXTS.he.fields[ESectionFields.CalculationMethod]
        }
        name={ESectionFields.CalculationMethod}
      />
      <DropdownInput
        isRequired
        options={SECTION_CALULATION_TYPE_OPTIONS}
        label={SECTIONS_DISPALY_TEXTS.he.fields[ESectionFields.CalculationType]}
        name={ESectionFields.CalculationType}
      />
      <TextInput
        label={SECTIONS_DISPALY_TEXTS.he.fields[ESectionFields.AmountType]}
        name={ESectionFields.AmountType}
      />
      <NumberInput
        isRequired
        label={SECTIONS_DISPALY_TEXTS.he.fields[ESectionFields.ItemsStartIndex]}
        name={ESectionFields.ItemsStartIndex}
      />
      <NumberInput
        isRequired
        label={SECTIONS_DISPALY_TEXTS.he.fields[ESectionFields.ItemPrice]}
        name={ESectionFields.ItemPrice}
        afterChange={() => {
          calcTotalSum();
          calcMilestonesPrice();
        }}
      />
      <NumberInput
        isRequired
        label={SECTIONS_DISPALY_TEXTS.he.fields[ESectionFields.ItemsCount]}
        name={ESectionFields.ItemsCount}
        afterChange={calcTotalSum}
      />
      <NumberInput
        isRequired
        label={SECTIONS_DISPALY_TEXTS.he.fields[ESectionFields.TotalSum]}
        name={ESectionFields.TotalSum}
        numericFormatProps={{ readOnly: true }}
      />
      <TextInput
        label={SECTIONS_DISPALY_TEXTS.he.fields[ESectionFields.Description]}
        name={ESectionFields.Description}
      />
    </StyledContractSectionFormFields>
  );
};
