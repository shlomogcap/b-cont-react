import { IHandleSwapOrderIndexFunc } from '../ContractSectionForm';

export type IMilestonesProps = {};

export type IMilestonesTableProps = {
  isLoading: boolean;
  isPreviewMode: boolean;
  handleDeleteMilestone: (id: string) => void;
  handleSwapMilestonesOrderIndex: IHandleSwapOrderIndexFunc;
};

export type IGetVirtualUnitsArrayArgs = {
  isPauschal: boolean;
  itemsStartIndex: number;
  itemsCount: number;
};

export type ICalcTotalUnitMilestonePlanArgs = {
  weight: number;
  price: number;
  sectionItemsCount: number;
  sectionTotalSum: number;
  sectionItemPrice: number;
  isPauschal: boolean;
  isPercentageSection: boolean;
};

export type IActualFormCell = {
  id?: string;
  oldValue: number;
  diffValue: number;
  value: number;
  sectionRef: string;
  unit: number;
  periods: { period: number; value: number }[];
};
export type IAccountFormCell = {
  value: number;
  sectionRef: string;
};
