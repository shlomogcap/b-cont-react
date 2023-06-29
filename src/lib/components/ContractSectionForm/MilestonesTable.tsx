import {
  EMilestoneFields,
  IMilestoneDoc,
  MILESTONES_DISPALY_TEXTS,
} from '@/lib/consts/milestones';
import {
  StyledCellCircelButton,
  StyledGrandTotal,
  StyledHeader,
  StyledIndex,
  StyledMilestonesTable,
  StyledTotal,
  StyledValue,
} from './ContractSectionForm.styled';
import { IMilestonesTableProps } from './ContractSectionForm.types';
import {
  ESectionCalculationMethod,
  ESectionCalculationType,
  ESectionFields,
} from '@/lib/consts/sections';
import { useFormContext, useWatch } from 'react-hook-form';
import { DISPLAY_TEXTS, ETableStates } from '@/lib/consts/displayTexts';
import { EmptyState } from '../commons/EmptyState';
import { NumberInput, TextInput } from '../commons/Input';
import { toNumber } from '@/lib/utils/numberUtils';
import { generateNumberArray } from '@/lib/utils/arrayUtils';
import { useCallback } from 'react';
import { DeleteIcon } from '../icons';
import { safeJSONParse } from '@/lib/utils/safeJsonParse';
import { sortBy } from 'lodash-es';

const calcTotalMilestones = (
  ms: IMilestoneDoc[],
  milestoneValueField: EMilestoneFields,
): number => ms.reduce((acc, ms) => acc + toNumber(ms[milestoneValueField]), 0);

const useVirtualUnitsArray = ({
  itemsCount,
  isPauschal,
  itemsStartIndex,
}: {
  isPauschal: boolean;
  itemsStartIndex: number;
  itemsCount: number;
}) => {
  const calcArray = useCallback(() => {
    const startIndex = itemsStartIndex ?? 1;
    const units = itemsCount || 1;
    const totalUnits = units + startIndex;
    return isPauschal ? generateNumberArray(startIndex, totalUnits - 1) : [1];
  }, [isPauschal, itemsStartIndex, itemsCount]);
  return calcArray();
};

export const calcTotalUnitMilestonePlan = ({
  weight,
  price,
  sectionItemsCount,
  sectionTotalSum,
  sectionItemPrice,
  isPauschal,
  isPercentageSection,
}: {
  weight: number;
  price: number;
  sectionItemsCount: number;
  sectionTotalSum: number;
  sectionItemPrice: number;
  isPauschal: boolean;
  isPercentageSection: boolean;
}) => {
  if (isPauschal) {
    return (sectionTotalSum * weight) / 100 / sectionItemsCount;
  }
  return isPercentageSection ? sectionItemPrice * (weight / 100) : price;
};

const MilestoneUnitRow = ({
  isPreviewMode,
  itemsCount,
  milestones,
  milestoneValueField,
  isPercentageSection,
  sectionTotalSum,
  sectionItemPrice,
  isPauschal,
  milestonesTotal,
  unit,
}: {
  itemsCount: number;
  milestones: IMilestoneDoc[];
  milestoneValueField: EMilestoneFields.Weight | EMilestoneFields.Price;
  isPercentageSection: boolean;
  milestonesTotal: number;
  sectionTotalSum: number;
  sectionItemPrice: number;
  isPauschal: boolean;
  isPreviewMode: boolean;
  unit: number | string;
}) => (
  <>
    <StyledIndex>
      {isPreviewMode ? unit : itemsCount > 1 ? `X ${itemsCount}` : '-'}
    </StyledIndex>
    {milestones.map((ms, i) => (
      <StyledValue key={`body/${ms.id}`}>
        {isPreviewMode ? (
          `${calcTotalUnitMilestonePlan({
            weight: ms[EMilestoneFields.Weight],
            price: ms[EMilestoneFields.Price],
            sectionItemsCount: itemsCount,
            sectionTotalSum,
            sectionItemPrice,
            isPauschal,
            isPercentageSection,
          }).toLocaleString()}${isPercentageSection ? ' %' : ''}`
        ) : (
          <NumberInput
            name={`milestones[${i}].${milestoneValueField}`}
            label={MILESTONES_DISPALY_TEXTS.he.fields[milestoneValueField]}
            numericFormatProps={{ suffix: isPercentageSection ? ' %' : '' }}
            hideLabel
          />
        )}
      </StyledValue>
    ))}
    <StyledTotal>{`${milestonesTotal.toLocaleString()}${
      isPercentageSection ? ' %' : ''
    }`}</StyledTotal>
  </>
);

export const MilestonesTable = ({
  isLoading,
  isPreviewMode,
  handleDeleteMilestone,
  handleSwapMilestonesOrderIndex,
}: IMilestonesTableProps) => {
  const { watch } = useFormContext();
  const [
    calculationType,
    calculationMethod,
    price,
    itemsCount,
    itemsStartIndex,
    totalSum,
  ] = useWatch({
    name: [
      ESectionFields.CalculationType,
      ESectionFields.CalculationMethod,
      ESectionFields.ItemPrice,
      ESectionFields.ItemsCount,
      ESectionFields.ItemsStartIndex,
      ESectionFields.TotalSum,
    ],
  });
  const isPauschal = calculationMethod === ESectionCalculationMethod.Pauschal;
  const isPercentageSection =
    calculationType === ESectionCalculationType.Percentage;

  const virtualUnits = useVirtualUnitsArray({
    isPauschal,
    itemsCount: toNumber(itemsCount),
    itemsStartIndex: toNumber(itemsStartIndex),
  });

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
      {sortBy(watchMilestones, EMilestoneFields.OrderIndex).map((ms, i) => (
        <StyledHeader
          data-order-index={ms.orderIndex}
          data-title={ms.title}
          data-id={ms.id}
          key={`title/${ms.id}`}
          draggable
          onDragStart={(e) =>
            e.dataTransfer.setData('text', JSON.stringify(ms))
          }
          onDragOver={(e) => {
            if (JSON.stringify(ms) !== e.dataTransfer.getData('text')) {
              e.preventDefault();
              e.currentTarget.style.border = '1px dashed gray';
            } else {
              e.currentTarget.style.border = 'none';
            }
          }}
          onDragLeave={(e) => {
            if (JSON.stringify(ms) !== e.dataTransfer.getData('text')) {
              e.currentTarget.style.border = 'none';
            }
          }}
          onDragExit={(e) => {
            if (JSON.stringify(ms) !== e.dataTransfer.getData('text')) {
              e.currentTarget.style.border = 'none';
            }
          }}
          onDrop={(e) => {
            const originalDocString = e.dataTransfer.getData('text');
            e.currentTarget.style.border = 'none';
            if (JSON.stringify(ms) !== originalDocString) {
              e.preventDefault();
              // ms.setIndex(msId)
              const originalDoc =
                safeJSONParse<IMilestoneDoc>(originalDocString);
              // alert(
              //   'TODO: set item index of ' +
              //     originalDoc.title +
              //     ' to -> ' +
              //     e.currentTarget.dataset.orderIndex +
              //     ' and ' +
              //     e.currentTarget.dataset.title +
              //     ' to ' +
              //     originalDoc.orderIndex,
              // );
              handleSwapMilestonesOrderIndex({
                originalDoc: {
                  id: String(originalDoc.id),
                  orderIndex: originalDoc.orderIndex,
                },
                otherDoc: {
                  id: String(e.currentTarget.dataset.id),
                  orderIndex: Number(e.currentTarget.dataset.orderIndex),
                },
              });
            }
            e.dataTransfer.clearData();
          }}
        >
          <TextInput
            name={`milestones[${i}].${EMilestoneFields.Title}`}
            label={MILESTONES_DISPALY_TEXTS.he.fields[EMilestoneFields.Title]}
            hideLabel
          />
          <StyledCellCircelButton
            onClick={() => handleDeleteMilestone(String(ms.id))}
          >
            <DeleteIcon />
          </StyledCellCircelButton>
        </StyledHeader>
      ))}
      <StyledTotal>{MILESTONES_DISPALY_TEXTS.he.total}</StyledTotal>

      {/* ROWS */}
      {[...(isPreviewMode ? virtualUnits : ['*'])].map((unit) => (
        <MilestoneUnitRow
          key={unit}
          unit={unit}
          itemsCount={itemsCount}
          milestonesTotal={milestonesTotal}
          isPercentageSection={isPercentageSection}
          milestoneValueField={milestoneValueField}
          milestones={watchMilestones}
          isPreviewMode={isPreviewMode}
          isPauschal={isPauschal}
          sectionItemPrice={price}
          sectionTotalSum={totalSum}
        />
      ))}

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
