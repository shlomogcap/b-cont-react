import { useFormContext, useWatch } from 'react-hook-form';
import { IMilestonesTableProps } from '../ContractSectionForm';
import {
  ESectionCalculationMethod,
  ESectionCalculationType,
  ESectionFields,
} from '@/lib/consts/sections';
import { calcTotalMilestones, useVirtualUnitsArray } from './Milestones.utils';
import { toNumber } from '@/lib/utils/numberUtils';
import {
  EMilestoneFields,
  IMilestoneDoc,
  MILESTONES_DISPALY_TEXTS,
} from '@/lib/consts/milestones';
import { EmptyState } from '../commons/EmptyState';
import { DISPLAY_TEXTS, ETableStates } from '@/lib/consts/displayTexts';
import {
  StyledActualValue,
  StyledGrandTotal,
  StyledHeader,
  StyledIndex,
  StyledMilestonesTable,
  StyledTotal,
  StyledValue,
} from './Milestones.styled';
import { sortBy } from 'lodash-es';
import { NumberInput } from '../commons/Input';
import { EActualFields } from '@/lib/consts/actuals/ActualFields';
import { toInteger } from 'lodash-es';

type IMilestoneUnitRowProps = {
  milestones: IMilestoneDoc[];
  isPercentageSection: boolean;
  milestonesTotal: number;
  unit: number | string;
  isPauschal: boolean;
  sectionItemsCount: number;
};

const MilestoneUnitRow = ({
  milestones,
  isPercentageSection,
  milestonesTotal,
  unit,
  isPauschal,
  sectionItemsCount,
}: IMilestoneUnitRowProps) => {
  const { watch, setValue } = useFormContext();
  return (
    <>
      <StyledIndex>{unit}</StyledIndex>
      {milestones.map((ms, milestoneColumn) => {
        const fieldPath = `actuals.${milestoneColumn}.${Number(unit) - 1}`;
        const fieldName = `${fieldPath}.${EActualFields.Value}`;
        const totalActual = toNumber(watch(fieldName));
        const percentDone = isPauschal
          ? toInteger(totalActual)
          : toInteger(totalActual / sectionItemsCount) * 100;
        return (
          <StyledActualValue
            key={`body/${ms.id}/${unit}`}
            style={{
              backgroundImage: `linear-gradient(90deg, ${
                percentDone <= 100
                  ? 'var(--color-active-trs)'
                  : 'var(--color-red-trs)'
              } ${percentDone}%, white 0)`,
              backgroundRepeat: 'no-repeat',
            }}
          >
            <NumberInput
              name={fieldName}
              label={''}
              numericFormatProps={{
                suffix: isPercentageSection ? ' %' : '',
                decimalScale: 2,
              }}
              hideLabel
              afterChange={(v) => {
                const oldValue: number = watch(`${fieldPath}.oldValue`);
                const currentValue = toNumber(v);
                const diff = currentValue - oldValue;
                setValue(`${fieldPath}.diffValue`, diff);

                //TODO: think how to implement this approach of setting value to accounts
                // const fieldToSet = `accounts.${milestoneColumn}.${0}.${
                //   EActualFields.Value
                // }`;
                // const existsValue: number = toNumber(watch(fieldToSet, 0));
                // const subTotal =
                //   existsValue + ( diff / sectionItemsCount);
                // setValue(fieldToSet, subTotal);
              }}
            />
          </StyledActualValue>
        );
      })}
      <StyledTotal>{`${milestonesTotal.toLocaleString()}${
        isPercentageSection ? ' %' : ''
      }`}</StyledTotal>
    </>
  );
};

export const MilestonesActulasTable = ({
  isLoading,
}: Pick<IMilestonesTableProps, 'isLoading'>) => {
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
      `section.${ESectionFields.CalculationType}`,
      `section.${ESectionFields.CalculationMethod}`,
      `section.${ESectionFields.ItemPrice}`,
      `section.${ESectionFields.ItemsCount}`,
      `section.${ESectionFields.ItemsStartIndex}`,
      `section.${ESectionFields.TotalSum}`,
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
      {/* HEADERS */}
      <StyledIndex>
        {MILESTONES_DISPALY_TEXTS.he.fields[EMilestoneFields.OrderIndex]}
      </StyledIndex>
      {sortBy(watchMilestones, EMilestoneFields.OrderIndex).map((ms, i) => (
        <StyledHeader
          data-order-index={ms.orderIndex}
          data-title={ms.title}
          data-id={ms.id}
          key={`title/${ms.id}`}
        >
          {watch(`milestones[${i}].${EMilestoneFields.Title}`)}
        </StyledHeader>
      ))}
      <StyledTotal>{MILESTONES_DISPALY_TEXTS.he.total}</StyledTotal>

      {/* WEIGHT|PRICE SUB-HEADERS */}
      <StyledIndex>-</StyledIndex>
      {sortBy(watchMilestones, EMilestoneFields.OrderIndex).map((ms, i) => {
        const [msWeight, msPrice] = watch([
          `milestones.[${i}]${EMilestoneFields.Weight}`,
          `milestones.[${i}]${EMilestoneFields.Price}`,
        ]);
        const milestoneValue = isPercentageSection
          ? toNumber(msWeight)
          : toNumber(msPrice);
        const totalValue = isPercentageSection
          ? (milestoneValue / 100) * price
          : milestoneValue;
        return (
          <StyledValue key={`sub-header/${ms.id}`}>
            {`${milestoneValue.toLocaleString()} ${
              isPercentageSection ? ' %' : '₪'
            }${
              isPercentageSection ? ` [${totalValue.toLocaleString()} ₪]` : ''
            }`}
          </StyledValue>
        );
      })}
      <StyledTotal dir='ltr'>{`${milestonesTotal.toLocaleString()} ₪`}</StyledTotal>

      {/* ROWS */}
      {[...virtualUnits].map((unit) => (
        <MilestoneUnitRow
          key={unit}
          unit={unit}
          milestonesTotal={milestonesTotal}
          isPercentageSection={isPercentageSection}
          milestones={watchMilestones}
          isPauschal
          sectionItemsCount={itemsCount}
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
          ? `${price?.toLocaleString()} / ${totalSum?.toLocaleString()}`
          : totalSum?.toLocaleString()}
      </StyledTotal>
    </StyledMilestonesTable>
  );
};
