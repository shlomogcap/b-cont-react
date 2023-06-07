import { ContractProvider } from '@/lib/context/contractContext';
import { ContractPage } from '@/lib/components/ContractPage';
import { IContractRouteProps } from './_types';
import { getContractRouteServerSideProps } from './_utils';

export const getServerSideProps = getContractRouteServerSideProps;

export default function ContractPlanPage({
  projectId,
  projectType,
  contractId,
}: IContractRouteProps) {
  return (
    <ContractProvider projectId={projectId} contractId={contractId}>
      <ContractPage projectId={projectId} projectType={projectType}>
        <div>PLAN</div>
      </ContractPage>
    </ContractProvider>
  );
}
