import { GetServerSideProps } from 'next';
import { IContractRouteProps } from './_types';
import { queryParamToString } from '@/lib/utils/queryParamToString';
import { ProjectType } from '@/lib/consts/projects';
import {
  CONTRACT_ID_QUERY,
  CONTRACT_STAGE_QUERY,
  PROJECT_ID_QUERY,
  PROJECT_TYPE_QUERY,
} from '@/lib/consts/routes';
import { IContractStage } from '@/lib/consts/contracts/ContractStage';

export const getContractRouteServerSideProps: GetServerSideProps<
  IContractRouteProps
> = async ({ query }) => {
  const projectType = queryParamToString<ProjectType>(
    query,
    PROJECT_TYPE_QUERY,
  );
  const projectId = queryParamToString(query, PROJECT_ID_QUERY);
  const contractId = queryParamToString(query, CONTRACT_ID_QUERY);
  const stage = queryParamToString<IContractStage>(query, CONTRACT_STAGE_QUERY);
  return {
    props: { projectType, projectId, contractId, stage },
  };
};
