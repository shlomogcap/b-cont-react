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
import { IMilestonesTableProps } from './ContractSectionForm.types';
import { ESectionCalculationType, ESectionFields } from '@/lib/consts/sections';
import { useFormContext, useWatch } from 'react-hook-form';
import { DISPLAY_TEXTS, ETableStates } from '@/lib/consts/displayTexts';
import { EmptyState } from '../commons/EmptyState';
import { NumberInput, TextInput } from '../commons/Input';
import { toNumber } from '@/lib/utils/numberUtils';

const calcTotalMilestones = (
  ms: IMilestoneDoc[],
  milestoneValueField: EMilestoneFields,
): number => ms.reduce((acc, ms) => acc + toNumber(ms[milestoneValueField]), 0);

export const MilestonesTable = ({
  isLoading,
  isPreviewMode,
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
  const watchMilestones: IMilestoneDoc[] = useWatch({
    name: 'milestones',
  });
  const milestonesTotal = calcTotalMilestones(
    watchMilestones,
    milestoneValueField,
  );
  return isLoading ? (
    <EmptyState
      animation='pulse'
      content={DISPLAY_TEXTS.he.tableStates[ETableStates.Loading]}
    />
  ) : (
    <StyledMilestonesTable
      style={{
        gridTemplateColumns: `min-content repeat(${watchMilestones.length},1fr) 1fr`,
      }}
    >
      <StyledIndex>
        {MILESTONES_DISPALY_TEXTS.he.fields[EMilestoneFields.OrderIndex]}
      </StyledIndex>
      {watchMilestones.map((ms, i) => (
        <StyledHeader key={`title/${ms.id}`}>
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
      {watchMilestones.map((ms, i) => (
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
      {watchMilestones.map((ms, ind) => {
        const [msWeight, msPrice] = watch([
          `milestones.[${ind}]${EMilestoneFields.Weight}`,
          `milestones.[${ind}]${EMilestoneFields.Price}`,
        ]);
        const totalValue = isPercentageSection
          ? (toNumber(msWeight) / 100) * price
          : toNumber(msPrice);
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
