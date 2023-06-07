import { IContractFields, IContractStatus } from '@/lib/consts/contracts';
import { IRoutesNames } from '@/lib/consts/routes';
import { firestore } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps<{}> = async ({ query }) => {
  const contractRef = doc(
    firestore,
    `project/${query.projectId}/contracts/${query.contractId}`,
  );
  const contract = await getDoc(contractRef);
  if (!contract.exists) {
    return {
      notFound: true,
    };
  }
  const accountStage: 'billing' | 'actual' = 'actual';
  const contractStage =
    contract.data()?.[IContractFields.Status] === IContractStatus.Plan
      ? 'plan'
      : accountStage;
  return {
    props: {},
    redirect: {
      destination: `/app/projects/${query.projectId}/${query.projectType}/contracts/${query.contractId}/${contractStage}`,
      permanent: false,
    },
  };
};

export default function ContractRoute() {
  return null;
}
