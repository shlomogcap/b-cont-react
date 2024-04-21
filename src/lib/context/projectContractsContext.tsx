import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { firestore } from '@firebase';
import { collection } from 'firebase/firestore';
import { IContractDoc } from '../consts/contracts';
import { onSnapshotHandler } from '../utils/onSnapshotHandler';
import { IAccountDoc } from '../consts/accounts/AccountDoc';
import { groupBy, sortBy } from 'lodash-es';
import { extractParentPath } from '../utils/urlUtils';
import { EAccountFields } from '../consts/accounts/AccountFields';

export type IContractLastAccountData = { [contractId: string]: IAccountDoc[] };

type IProjectContractData = {
  contracts: IContractDoc[];
  contractAccountMap: IContractLastAccountData;
};

type IProjectContractsContext = {
  data: IProjectContractData;
  isLoading: boolean;
  error: string;
};

type IProjectContractsProviderProps = {
  projectId: string;
};

const ProjectContractsContext = createContext<IProjectContractsContext>({
  data: { contracts: [], contractAccountMap: {} },
  isLoading: false,
  error: '',
});

const prepareContractLastAccountMap = (
  accounts: IAccountDoc[],
): IContractLastAccountData => {
  return groupBy(sortBy(accounts, EAccountFields.PeriodNumber), (acc) =>
    extractParentPath(acc.path),
  ) as any;
};

export const useProjectContractsContext = () =>
  useContext(ProjectContractsContext);

export const ProjectContractsProvider = ({
  projectId,
  children,
}: PropsWithChildren<IProjectContractsProviderProps>) => {
  const [contracts, setContractsData] = useState<IContractDoc[]>([]);
  const [contractsLastAccounts, setContractsLastAccounts] = useState<
    IAccountDoc[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    const collectionRef = collection(
      firestore,
      `projects/${projectId}/contracts`,
    );

    const unsubscribe = onSnapshotHandler({
      collectionRef,
      setIsLoading,
      setData: setContractsData,
      setError,
    });

    return () => unsubscribe();
  }, [projectId]);

  useEffect(() => {
    for (const contract of contracts) {
      const accountCollectionRef = collection(
        firestore,
        `${contract.path}/accounts`,
      );
      onSnapshotHandler({
        collectionRef: accountCollectionRef,
        setData: setContractsLastAccounts,
        setError,
        setIsLoading,
      });
    }
  }, [contracts]);

  return (
    <ProjectContractsContext.Provider
      value={{
        data: {
          contracts,
          contractAccountMap: prepareContractLastAccountMap(
            contractsLastAccounts,
          ),
        },
        isLoading,
        error,
      }}
    >
      {children}
    </ProjectContractsContext.Provider>
  );
};
