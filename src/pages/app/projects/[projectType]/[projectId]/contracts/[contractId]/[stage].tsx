import { ContractProvider } from '@/lib/context/contractContext';
import { ContractPage } from '@/lib/components/ContractPage';
import { IContractRouteProps } from './_types';
import { getContractRouteServerSideProps } from './_utils';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { IContractStage } from '@/lib/consts/contracts/ContractStage';
import {
  CONTRACT_ID_QUERY,
  IRoutesNames,
  PROJECT_ID_QUERY,
  PROJECT_TYPE_QUERY,
} from '@/lib/consts/routes';

export const getServerSideProps = getContractRouteServerSideProps;

export default function ContractPlanPage({
  projectId,
  projectType,
  contractId,
  stage,
}: IContractRouteProps) {
  const router = useRouter();
  useEffect(() => {
    if (router.isReady) {
      if (!Object.values(IContractStage).includes(stage)) {
        router.push({
          pathname: IRoutesNames.Project,
          query: {
            [PROJECT_ID_QUERY]: projectId,
            [PROJECT_TYPE_QUERY]: projectType,
          },
        });
      }
    }
  });
  return (
    <ContractProvider projectId={projectId} contractId={contractId}>
      <ContractPage
        projectId={projectId}
        projectType={projectType}
        stage={stage}
      >
        <div>{stage}</div>
      </ContractPage>
    </ContractProvider>
  );
}
