import { EContractStage } from '@/lib/consts/contracts/ContractStage';
import { EProjectType } from '@/lib/consts/projects';

export type IContractPageProps = {
  projectId: string;
  projectType: EProjectType;
  stage: EContractStage;
};
