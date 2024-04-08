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

type GetRelatedActualsBaseArgs = {
  unit?: number;
  currentAccountPeriod: number;
  sectionRef: string;
  actuals: IActualDoc[];
  getByUnit: boolean;
};
type GetRelatedActualsArgs =
  | (GetRelatedActualsBaseArgs & { getByUnit: true; unit: number })
  | (GetRelatedActualsBaseArgs & { getByUnit: false; unit?: undefined });

const getRelatedActuals = ({
  currentAccountPeriod,
  actuals,
  sectionRef,
  unit,
  getByUnit,
}: GetRelatedActualsArgs) =>
  actuals.filter(
    (actual) =>
      actual[EActualFields.SectionRef] === sectionRef &&
      (!getByUnit || actual[EActualFields.Unit] === unit) &&
      actual[EActualFields.PeriodNumber] <= currentAccountPeriod,
  );

export const transformActualsToFormShape = ({
  actuals,
  milestones,
  section,
  currentAccountPeriod,
}: ITransformActualsToFormShapeArgs) => {
  if (!section || milestones.length === 0) {
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
        getByUnit: true,
      });
      const cumulativeValue = sumBy(relatedActuals, 'value');
      units.push({
        oldValue: cumulativeValue,
        diffValue: 0,
        value: cumulativeValue,
        sectionRef: ms.path,
        unit,
        calc: {} as any,
        currentTotal: 0,
        periods: relatedActuals.map((actual) => ({
          value: actual.value,
          period: actual.periodNumber,
        })),
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
        getByUnit: false,
      });
      const actualsValue = sumBy(relatedActuals, 'value');
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
