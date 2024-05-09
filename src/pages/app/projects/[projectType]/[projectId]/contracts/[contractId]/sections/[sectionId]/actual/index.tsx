import { SectionActualPage } from '@/lib/components/SectionActualPage';
import { EContractStage } from '@/lib/consts/contracts';
import { EProjectType } from '@/lib/consts/projects';
import {
  CONTRACT_ID_QUERY,
  CONTRACT_STAGE_QUERY,
  PROJECT_ID_QUERY,
  PROJECT_TYPE_QUERY,
  SECTION_ID_QUERY,
} from '@/lib/consts/routes';
import { ContractProvider } from '@/lib/context/contractContext';
import { ProjectContractsProvider } from '@/lib/context/projectContractsContext';
import { SectionProvider } from '@/lib/context/sectionContext';
import { queryParamsValues } from '@/lib/utils/queryParamToString';
import { GetServerSideProps } from 'next';

type ISectionActualRouteProps = {
  projectId: string;
  contractId: string;
  sectionId: string;
  projectType: string;
  stage: string;
};

export const getServerSideProps: GetServerSideProps<
  ISectionActualRouteProps
> = async (ctx) => {
  const { projectId, contractId, sectionId, projectType, stage } =
    queryParamsValues(ctx.query, [
      PROJECT_ID_QUERY,
      CONTRACT_ID_QUERY,
      SECTION_ID_QUERY,
      PROJECT_TYPE_QUERY,
      CONTRACT_STAGE_QUERY,
    ]);
  return {
    props: { projectId, contractId, sectionId, projectType, stage },
  };
};

export default function SectionActualRoute({
  projectId,
  contractId,
  sectionId,
  projectType,
  stage,
}: ISectionActualRouteProps) {
  const sectionPath = `projects/${projectId}/contracts/${contractId}/sections/${sectionId}`;
  return (
    <ProjectContractsProvider projectId={projectId}>
      <ContractProvider contractId={contractId} projectId={projectId}>
        <SectionProvider sectionPath={sectionPath}>
          <SectionActualPage
            contractId={contractId}
            projectId={projectId}
            projectType={projectType as EProjectType}
            stage={stage as EContractStage}
          />
        </SectionProvider>
      </ContractProvider>
    </ProjectContractsProvider>
  );
}
