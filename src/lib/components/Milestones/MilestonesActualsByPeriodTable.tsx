import { useFormContext, useWatch } from 'react-hook-form';
import { IMilestonesTableProps } from '../ContractSectionForm';
import { ESectionCalculationType, ESectionFields } from '@/lib/consts/sections';
import { calcTotalMilestones } from './Milestones.utils';
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
import { IAccountDoc } from '@/lib/consts/accounts/AccountDoc';
import { EAccountFields } from '@/lib/consts/accounts/AccountFields';

export const MilestonesActualsByPeriodTable = ({
  accounts,
  isLoading,
}: Pick<IMilestonesTableProps, 'isLoading'> & { accounts: IAccountDoc[] }) => {
  const { watch } = useFormContext();
  const [calculationType, _calculationMethod, price, itemsCount, totalSum] =
    useWatch({
      name: [
        `section.${ESectionFields.CalculationType}`,
        `section.${ESectionFields.CalculationMethod}`,
        `section.${ESectionFields.ItemPrice}`,
        `section.${ESectionFields.ItemsCount}`,
        `section.${ESectionFields.TotalSum}`,
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
        gridTemplateColumns: `min-content repeat(${watchMilestones.length},1fr) 1fr 1fr`,
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
      <StyledTotal>{MILESTONES_DISPALY_TEXTS.he.subTotal}</StyledTotal>
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
      <StyledTotal dir='ltr'>{''}</StyledTotal>
      <StyledTotal dir='ltr'>{`${milestonesTotal.toLocaleString()} ₪`}</StyledTotal>

      {/* ROWS */}
      {accounts.map((account, accountRow) => {
        return (
          <>
            <StyledIndex>{account[EAccountFields.Period]}</StyledIndex>
            {watchMilestones.map((ms, i) => {
              const fieldPath = `accounts.${i}.${accountRow}`;
              const fieldName = `${fieldPath}.${EActualFields.Value}`;
              const totalActual = toNumber(watch(fieldName));
              const percentDone = toInteger(totalActual / itemsCount) * 100;
              return (
                <StyledActualValue
                  key={fieldName}
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
                    readOnly //TODO: should be depend on type of section... if pauschal and have itemsCount > 0 it should be readOnly
                    name={fieldName}
                    label={''}
                    numericFormatProps={{
                      suffix: isPercentageSection ? ' %' : '',
                      decimalScale: 2,
                    }}
                    hideLabel
                  />
                </StyledActualValue>
              );
            })}
            <StyledTotal>{''}</StyledTotal>
            <StyledTotal>{`${milestonesTotal.toLocaleString()}${
              isPercentageSection ? ' %' : ''
            }`}</StyledTotal>
          </>
        );
      })}

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
      <StyledTotal></StyledTotal>
      <StyledTotal>
        {itemsCount > 1
          ? `${price?.toLocaleString()} / ${totalSum?.toLocaleString()}`
          : totalSum?.toLocaleString()}
      </StyledTotal>
    </StyledMilestonesTable>
  );
};
