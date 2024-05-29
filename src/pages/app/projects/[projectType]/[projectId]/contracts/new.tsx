import { ContractPage } from '@/lib/components/ContractPage';
import { EContractStage } from '@/lib/consts/contracts';
import { PROJECT_ID_QUERY, PROJECT_TYPE_QUERY } from '@/lib/consts/routes';
import { queryParamToString } from '@/lib/utils/queryParamToString';
import { useRouter } from 'next/router';

export default function NewContractRoute() {
  const { query } = useRouter();
  return (
    <ContractPage
      stage={EContractStage.Plan}
      projectType={queryParamToString(query, PROJECT_TYPE_QUERY)}
      projectId={queryParamToString(query, PROJECT_ID_QUERY)}
    />
  );
}
