import { IContractStage } from '@/lib/consts/contracts/ContractStage';
import { ProjectType } from '@/lib/consts/projects';

export type IContractPageProps = {
  projectId: string;
  projectType: ProjectType;
  stage: IContractStage;
};
