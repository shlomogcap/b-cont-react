import { EContractStage } from '@/lib/consts/contracts';
import { EProjectType } from '@/lib/consts/projects';

export type ISectionActualPageProps = {
  projectId: string;
  projectType: EProjectType;
  stage: EContractStage;
};
