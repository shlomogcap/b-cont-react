import { ContractPage } from '@/lib/components/ContractPage';
import { ContractProvider } from '@/lib/context/contractContext';
import { getContractRouteServerSideProps } from './_utils';
import { IContractRouteProps } from './_types';

export const getServerSideProps = getContractRouteServerSideProps;

export default function ContractBillingPage({
  projectId,
  projectType,
  contractId,
}: IContractRouteProps) {
  return (
    <ContractProvider projectId={projectId} contractId={contractId}>
      <ContractPage projectId={projectId} projectType={projectType}>
        <div>BILLING</div>
      </ContractPage>
    </ContractProvider>
  );
}
