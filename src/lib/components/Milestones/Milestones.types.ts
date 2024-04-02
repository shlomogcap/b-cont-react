import { IActualDoc } from '@/lib/consts/actuals/ActualDoc';
import { IHandleSwapOrderIndexFunc } from '../ContractSectionForm';
import { EActualFields } from '@/lib/consts/actuals/ActualFields';

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

export type IActualFormCell = Pick<
  IActualDoc,
  | EActualFields.SectionRef
  | EActualFields.Unit
  | EActualFields.Value
  | EActualFields.Calc
  | EActualFields.CurrentTotal
> & {
  oldValue: number;
  diffValue: number;
  periods: { period: number; value: number }[];
};
export type IAccountFormCell = {
  value: number;
  sectionRef: string;
};
