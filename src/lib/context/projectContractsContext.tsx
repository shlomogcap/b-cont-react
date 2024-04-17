import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { firestore } from '@firebase';
import { collection, query, where } from 'firebase/firestore';
import { EContractFields, IContractDoc } from '../consts/contracts';
import { onSnapshotHandler } from '../utils/onSnapshotHandler';
import { IAccountDoc } from '../consts/accounts/AccountDoc';
import { EAccountFields } from '../consts/accounts/AccountFields';

type IProjectContractData = {
  contract: IContractDoc[];
  lastAccount: IAccountDoc;
};

type IProjectContractsContext = {
  data: IProjectContractData[];
  isLoading: boolean;
  error: string;
};

type IProjectContractsProviderProps = {
  projectId: string;
};

const ProjectContractsContext = createContext<IProjectContractsContext>({
  data: [],
  isLoading: false,
  error: '',
});

export const useProjectContractsContext = () =>
  useContext(ProjectContractsContext);

export const ProjectContractsProvider = ({
  projectId,
  children,
}: PropsWithChildren<IProjectContractsProviderProps>) => {
  const [data, setData] = useState<IContractDoc[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    const queryRef = collection(firestore, `projects/${projectId}/contracts`);

    const unsubscribe = onSnapshotHandler({
      queryRef,
      setIsLoading,
      setData,
      setError,
    });

    return () => unsubscribe();
  }, [projectId]);

  useEffect(() => {
    data.forEach((contract) => {
      const accountCollectionRef = collection(
        firestore,
        `${contract.path}/accounts`,
      );
      const accountDocQuery = query(
        accountCollectionRef,
        where(
          EAccountFields.Period,
          '==',
          contract[EContractFields.CurrentAccountPeriod],
        ),
      );
      onSnapshotHandler({
        queryRef: accountDocQuery,
        setData,
        setError,
        setIsLoading,
      });
    });
  }, [data]);

  return (
    <ProjectContractsContext.Provider value={{ data, isLoading, error }}>
      {children}
    </ProjectContractsContext.Provider>
  );
};
