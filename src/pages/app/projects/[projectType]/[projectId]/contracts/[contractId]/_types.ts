import { EContractStage } from '@/lib/consts/contracts/ContractStage';
import { EProjectType } from '@/lib/consts/projects';

export type IContractRouteProps = {
  projectType: EProjectType;
  projectId: string;
  contractId: string;
  stage: EContractStage;
};
