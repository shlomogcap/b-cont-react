import { EMilestoneFields, IMilestoneDoc } from '@/lib/consts/milestones';
import { generateNumberArray } from '@/lib/utils/arrayUtils';
import { toNumber } from '@/lib/utils/numberUtils';
import { useCallback } from 'react';

export const calcTotalMilestones = (
  ms: IMilestoneDoc[],
  milestoneValueField: EMilestoneFields,
): number => ms.reduce((acc, ms) => acc + toNumber(ms[milestoneValueField]), 0);

export const useVirtualUnitsArray = ({
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
