import {
  EMilestoneFields,
  IMilestoneDoc,
  MILESTONES_DISPALY_TEXTS,
} from '@/lib/consts/milestones';
import {
  StyledGrandTotal,
  StyledHeader,
  StyledIndex,
  StyledMilestonesTable,
  StyledTotal,
  StyledValue,
} from './ContractSectionForm.styled';
import {
  IMilestonesTableProps,
  ISectionFormValues,
} from './ContractSectionForm.types';
import { ESectionCalculationType, ESectionFields } from '@/lib/consts/sections';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { DISPLAY_TEXTS, ITableStates } from '@/lib/consts/displayTexts';
import { EmptyState } from '../commons/EmptyState';
import { NumberInput, TextInput } from '../commons/Input';

export const MilestonesTable = ({
  milestones,
  isLoading,
}: IMilestonesTableProps) => {
  const { watch } = useFormContext();
  const [calculationType, price, itemsCount, totalSum] = useWatch({
    name: [
      ESectionFields.CalculationType,
      ESectionFields.ItemPrice,
      ESectionFields.ItemsCount,
      ESectionFields.TotalSum,
    ],
  });
  const isPercentageSection =
    calculationType === ESectionCalculationType.Percentage;
  const milestoneValueField = isPercentageSection
    ? EMilestoneFields.Weight
    : EMilestoneFields.Price;
  const milestonesFields = useFieldArray<
    ISectionFormValues,
    'milestones',
    '__intern__'
  >({
    name: 'milestones',
    keyName: '__intern__',
  });
  const watchMilestones: IMilestoneDoc[] = watch('milestones');
  const milestonesTotal = watchMilestones.reduce(
    (acc, ms) =>
      acc + Number(String(ms[milestoneValueField]).replace(/[^\d\.-]/g, '')),
    0,
  );
  return isLoading ? (
    <EmptyState
      animation='pulse'
      content={DISPLAY_TEXTS.he.tableStates[ITableStates.Loading]}
    />
  ) : (
    <StyledMilestonesTable
      style={{
        gridTemplateColumns: `min-content repeat(${milestones.length},1fr) 1fr`,
      }}
    >
      {/* HEADERS */}
      <StyledIndex>
        {MILESTONES_DISPALY_TEXTS.he.fields[EMilestoneFields.OrderIndex]}
      </StyledIndex>
      {milestonesFields.fields.map((ms, i) => (
        <StyledHeader key={`title/${ms.__intern__}`}>
          <TextInput
            name={`milestones[${i}].${EMilestoneFields.Title}`}
            label={MILESTONES_DISPALY_TEXTS.he.fields[EMilestoneFields.Title]}
            hideLabel
          />
        </StyledHeader>
      ))}
      <StyledTotal>{MILESTONES_DISPALY_TEXTS.he.total}</StyledTotal>

      {/* ROWS */}
      <StyledIndex>{itemsCount > 1 ? `X ${itemsCount}` : '-'}</StyledIndex>
      {milestonesFields.fields.map((ms, i) => (
        <StyledValue key={`body/${ms.id}`}>
          <NumberInput
            name={`milestones[${i}].${milestoneValueField}`}
            label={MILESTONES_DISPALY_TEXTS.he.fields[milestoneValueField]}
            numericFormatProps={{ suffix: isPercentageSection ? ' %' : '' }}
            hideLabel
          />
        </StyledValue>
      ))}
      <StyledTotal>{`${milestonesTotal.toLocaleString()}${
        isPercentageSection ? ' %' : ''
      }`}</StyledTotal>

      {/* TOTALS */}
      <StyledGrandTotal>{MILESTONES_DISPALY_TEXTS.he.total}</StyledGrandTotal>
      {milestones.map((ms) => {
        const totalValue = isPercentageSection
          ? (Number(ms[EMilestoneFields.Weight]) / 100) * price
          : Number(ms[EMilestoneFields.Price]);
        const grandTotalValue = totalValue * itemsCount;
        return (
          <StyledGrandTotal
            key={`totals/${ms.id}`}
          >{`${totalValue.toLocaleString()}${
            itemsCount > 1 ? ` / ${grandTotalValue.toLocaleString()}` : ''
          }`}</StyledGrandTotal>
        );
      })}
      <StyledTotal>
        {itemsCount > 1
          ? `${price.toLocaleString()} / ${totalSum.toLocaleString()}`
          : totalSum.toLocaleString()}
      </StyledTotal>
    </StyledMilestonesTable>
  );
};
