import { IActualDoc } from '@/lib/consts/actuals/ActualDoc';
import { EContractStage } from '@/lib/consts/contracts';
import { IMilestoneDoc } from '@/lib/consts/milestones';
import { EProjectType } from '@/lib/consts/projects';
import { ISectionDoc } from '@/lib/consts/sections';
import { IActualFormCell } from '../Milestones';
import { IAccountDoc } from '@/lib/consts/accounts/AccountDoc';

export type ISectionActualPageProps = {
  projectId: string;
  projectType: EProjectType;
  stage: EContractStage;
};

export type ITransformActualsToFormShapeArgs = {
  actuals: IActualDoc[];
  milestones: IMilestoneDoc[];
  section: ISectionDoc;
  currentAccountPeriod: number;
};

export type ITransformAccountsToFormShapeArgs = {
  actuals: IActualDoc[];
  milestones: IMilestoneDoc[];
  accounts: IAccountDoc[];
  section: ISectionDoc;
  currentAccountPeriod: number;
};

export type ITransformActualsFormValuesToAPIShapeArgs = {
  actuals: IActualDoc[];
  formValues: { actuals: IActualFormCell[][] };
  currentAccountPeriod: number;
};
