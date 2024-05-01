import { ContractProvider } from '@/lib/context/contractContext';
import { ContractPage } from '@/lib/components/ContractPage';
import { IContractRouteProps } from './_types';
import { getContractRouteServerSideProps } from './_utils';
import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';
import { EContractStage } from '@/lib/consts/contracts/ContractStage';
import {
  ERoutesNames,
  PROJECT_ID_QUERY,
  PROJECT_TYPE_QUERY,
} from '@/lib/consts/routes';
import { ContractPlan } from '@/lib/components/ContractPage/contractViews/ContractPlan';
import { ContractActuals } from '@/lib/components/ContractPage/contractViews/ContractActuals';
import { ProjectConfirmsSettingsProvider } from '@/lib/context/projectConfirmsSettingsContext';
import { ContractBilling } from '@/lib/components/ContractPage/contractViews/ContractBilling';

const CONTRACT_STAGE_PAGE: Record<EContractStage, ReactElement> = {
  [EContractStage.Plan]: <ContractPlan />,
  [EContractStage.Actual]: <ContractActuals />,
  [EContractStage.Billing]: <ContractBilling />,
};

export const getServerSideProps = getContractRouteServerSideProps;

export default function ContractPageRoute({
  projectId,
  projectType,
  contractId,
  stage,
}: IContractRouteProps) {
  const router = useRouter();
  useEffect(() => {
    if (router.isReady) {
      if (!Object.values(EContractStage).includes(stage)) {
        router.push({
          pathname: ERoutesNames.Project,
          query: {
            [PROJECT_ID_QUERY]: projectId,
            [PROJECT_TYPE_QUERY]: projectType,
          },
        });
      }
    }
  });
  return (
    <ProjectConfirmsSettingsProvider projectId={projectId}>
      <ContractProvider projectId={projectId} contractId={contractId}>
        <ContractPage
          projectId={projectId}
          projectType={projectType}
          stage={stage}
        >
          {CONTRACT_STAGE_PAGE[stage]}
        </ContractPage>
      </ContractProvider>
    </ProjectConfirmsSettingsProvider>
  );
}
