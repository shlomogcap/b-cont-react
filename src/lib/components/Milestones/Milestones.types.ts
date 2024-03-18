import { IHandleSwapOrderIndexFunc } from '../ContractSectionForm';

export type IMilestonesProps = {};

export type IMilestonesTableProps = {
  isLoading: boolean;
  isPreviewMode: boolean;
  handleDeleteMilestone: (id: string) => void;
  handleSwapMilestonesOrderIndex: IHandleSwapOrderIndexFunc;
};
