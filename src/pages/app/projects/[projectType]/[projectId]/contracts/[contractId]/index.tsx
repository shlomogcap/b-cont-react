import { EContractFields, EContractStatus } from '@/lib/consts/contracts';
import {
  CONTRACT_ID_QUERY,
  ERoutesNames,
  PROJECT_ID_QUERY,
  PROJECT_TYPE_QUERY,
} from '@/lib/consts/routes';
import { firestore } from '@/lib/firebase';
import { replaceQueryParams } from '@/lib/utils/replaceParams';
import { doc, getDoc } from 'firebase/firestore';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps<{}> = async ({ query }) => {
  const contractRef = doc(
    firestore,
    `projects/${query.projectId}/contracts/${query.contractId}`,
  );
  const contract = await getDoc(contractRef);
  if (!contract.exists()) {
    return {
      notFound: true,
    };
  }
  const defaultStage = 'actual';
  const contractStage =
    contract.data()?.[EContractFields.Status] === EContractStatus.Plan
      ? 'plan'
      : defaultStage;
  const destination = `${replaceQueryParams(ERoutesNames.Contract, query, [
    PROJECT_ID_QUERY,
    PROJECT_TYPE_QUERY,
    CONTRACT_ID_QUERY,
  ])}/${contractStage}`;
  return {
    props: {},
    redirect: {
      destination,
      permanent: false,
    },
  };
};

export default function ContractRoute() {
  return null;
}
