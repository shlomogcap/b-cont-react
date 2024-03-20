import { IActualDoc } from '@/lib/consts/actuals/ActualDoc';
import { EActualFields } from '@/lib/consts/actuals/ActualFields';
import { EMilestoneFields } from '@/lib/consts/milestones';
import { sortBy, sumBy } from 'lodash-es';
import { generateVirtualUnitsArray } from '../Milestones/Milestones.utils';
import { ESectionCalculationMethod } from '@/lib/consts/sections';
import {
  ITransformAccountsToFormShapeArgs,
  ITransformActualsFormValuesToAPIShapeArgs,
  ITransformActualsToFormShapeArgs,
} from './SectionActualPage.types';
import { IAccountFormCell, IActualFormCell } from '../Milestones';
import { toNumber } from '@/lib/utils/numberUtils';
import { EAccountFields } from '@/lib/consts/accounts/AccountFields';

const getRelatedActuals = ({
  currentAccountPeriod,
  actuals,
  sectionRef,
  unit,
}: {
  unit?: number;
  currentAccountPeriod: number;
  sectionRef: string;
  actuals: IActualDoc[];
}) =>
  actuals.filter(
    (actual) =>
      actual[EActualFields.SectionRef] === sectionRef &&
      (!unit || actual[EActualFields.Unit] === unit) &&
      actual[EActualFields.PeriodNumber] < currentAccountPeriod,
  );

export const transformActualsToFormShape = ({
  actuals,
  milestones,
  section,
  currentAccountPeriod,
}: ITransformActualsToFormShapeArgs) => {
  if (!section || milestones.length === 0 || actuals.length === 0) {
    return [];
  }
  const milestonesSorted = sortBy(milestones, EMilestoneFields.OrderIndex);
  const { itemsCount, itemsStartIndex = 0, calculationMethod } = section;
  const virtualUnitsArray = generateVirtualUnitsArray({
    itemsCount,
    itemsStartIndex,
    isPauschal: calculationMethod === ESectionCalculationMethod.Pauschal,
  });
  const result: IActualFormCell[][] = [];
  milestonesSorted.forEach((ms) => {
    const units: IActualFormCell[] = [];
    virtualUnitsArray.forEach((unit) => {
      const relatedActuals = getRelatedActuals({
        actuals,
        currentAccountPeriod,
        sectionRef: ms.path,
        unit,
      }).map((actual) => ({
        value: actual.value,
        period: actual.periodNumber,
      }));
      const cumulativeValue = sumBy(relatedActuals, 'value');
      units.push({
        oldValue: cumulativeValue,
        diffValue: 0,
        value: cumulativeValue,
        sectionRef: ms.path,
        unit,
        periods: relatedActuals,
      });
    });
    result.push(units);
  });
  return result;
};

export const transformAccountsToFormShape = ({
  accounts,
  actuals,
  milestones,
  section,
  currentAccountPeriod,
}: ITransformAccountsToFormShapeArgs) => {
  if (!section || milestones.length === 0 || actuals.length === 0) {
    return [];
  }
  const milestonesSorted = sortBy(milestones, EMilestoneFields.OrderIndex);
  const { itemsCount, calculationMethod } = section;
  const isPauschal = calculationMethod === ESectionCalculationMethod.Pauschal;
  return sortBy(
    accounts.filter(
      (account) =>
        Number(account[EAccountFields.Period]) <= currentAccountPeriod,
    ),
    EAccountFields.PeriodNumber,
  )?.map((account) => {
    return milestonesSorted.map((ms) => {
      const relatedActuals = getRelatedActuals({
        actuals,
        currentAccountPeriod: Number(account[EAccountFields.Period]),
        sectionRef: ms.path,
      });
      const actualsValue = sumBy(relatedActuals, 'value');
      console.log(
        'TODO: calculate all actuals for account regardless of unit ',
        actualsValue,
      );
      return {
        value: isPauschal && itemsCount > 1 ? 0 : actualsValue,
        sectionRef: ms.path,
      } as IAccountFormCell;
    });
  });
};

export const transformActualsFormValuesToAPIShape = ({
  formValues,
}: ITransformActualsFormValuesToAPIShapeArgs) => {
  return formValues.actuals
    .flatMap((row) =>
      row.map((actual) => {
        const value = toNumber(actual.value);
        const diffValue = actual.diffValue;
        return diffValue !== 0
          ? {
              ...actual,
              value,
              diffValue,
            }
          : null;
      }),
    )
    .filter(Boolean);
};
