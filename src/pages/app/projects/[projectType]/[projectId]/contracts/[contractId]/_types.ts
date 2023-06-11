import { IContractStage } from '@/lib/consts/contracts/ContractStage';
import { ProjectType } from '@/lib/consts/projects';

export type IContractRouteProps = {
  projectType: ProjectType;
  projectId: string;
  contractId: string;
  stage: IContractStage;
};
