import { ContractProvider } from '@/lib/context/contractContext';
import { ContractPage } from '@/lib/components/ContractPage';
import { IContractRouteProps } from './_types';
import { getContractRouteServerSideProps } from './_utils';
import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';
import { IContractStage } from '@/lib/consts/contracts/ContractStage';
import {
  IRoutesNames,
  PROJECT_ID_QUERY,
  PROJECT_TYPE_QUERY,
} from '@/lib/consts/routes';
import { ContractPlan } from '@/lib/components/ContractPage/contractViews/ContractPlan';

const CONTRACT_STAGE_PAGE: Record<IContractStage, ReactElement> = {
  [IContractStage.Plan]: <ContractPlan />,
  [IContractStage.Actual]: <ContractPlan />,
  [IContractStage.Billing]: <ContractPlan />,
};

export const getServerSideProps = getContractRouteServerSideProps;

export default function ContractPlanRoute({
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
        {CONTRACT_STAGE_PAGE[stage]}
      </ContractPage>
    </ContractProvider>
  );
}
