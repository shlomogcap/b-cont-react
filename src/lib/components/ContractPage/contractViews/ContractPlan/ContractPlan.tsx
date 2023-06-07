import { ContractForm } from '@/lib/components/ContractForm';
import { IContractPlanProps } from './ContractPlan.types';
import { Card } from '@/lib/components/commons/Card';
import { queryParamToString } from '@/lib/utils/queryParamToString';
import { useRouter } from 'next/router';
import { CONTRACT_ID_QUERY } from '@/lib/consts/routes';

export const ContractPlan = (props: IContractPlanProps) => {
  const { query } = useRouter();
  return (
    <>
      <Card title='Contract Plan'>
        <ContractForm id={queryParamToString(query, CONTRACT_ID_QUERY)} />
      </Card>
      <div style={{ marginTop: '1.5rem', gridColumn: '1 /-1' }} />
      ContractSectionsGraphichTable
    </>
  );
};
