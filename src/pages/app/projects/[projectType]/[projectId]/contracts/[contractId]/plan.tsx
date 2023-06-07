import {
  CONTRACT_ID_QUERY,
  PROJECT_ID_QUERY,
  PROJECT_TYPE_QUERY,
} from '@/lib/consts/routes';
import { ContractProvider } from '@/lib/context/contractContext';
import { queryParamToString } from '@/lib/utils/queryParamToString';
import { useRouter } from 'next/router';
import { ContractPage } from '@/lib/components/ContractPage';
import { ProjectType } from '@/lib/consts/projects';

export default function ContractPlanPage() {
  const { query } = useRouter();
  const projectType = queryParamToString<ProjectType>(
    query,
    PROJECT_TYPE_QUERY,
  );
  const projectId = queryParamToString(query, PROJECT_ID_QUERY);
  const contractId = queryParamToString(query, CONTRACT_ID_QUERY);
  return (
    <ContractProvider projectId={projectId} contractId={contractId}>
      <ContractPage projectId={projectId} projectType={projectType}>
        <div>PLAN</div>
      </ContractPage>
    </ContractProvider>
  );
}
