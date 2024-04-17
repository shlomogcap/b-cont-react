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

type IContractLastAccountData = { [contractId: string]: IAccountDoc };

type IProjectContractData = {
  contracts: IContractDoc[];
  contractLastAccount: IContractLastAccountData;
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
  data: { contracts: [], contractLastAccount: {} },
  isLoading: false,
  error: '',
});

const prepareContractLastAccountMap = (
  accounts: IAccountDoc[],
): IContractLastAccountData => {
  console.log(accounts);
  return {};
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
    contracts.forEach(async (contract) => {
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
      // onSnapshotHandler({
      //   collectionRef: accountDocQuery,
      //   setData: setContractsLastAccounts,
      //   setError,
      //   setIsLoading,
      // });
    });
  }, [contracts]);

  return (
    <ProjectContractsContext.Provider
      value={{
        data: {
          contracts,
          contractLastAccount: prepareContractLastAccountMap(
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
