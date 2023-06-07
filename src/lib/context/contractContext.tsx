import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { firestore } from '@firebase';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { onSnapshotHandler } from '../utils/onSnapshotHandler';
import { IContractDoc } from '../consts/contracts';

type IContractData = {
  contract: IContractDoc | null;
  sections: { title: string }[];
  accounts: { title: string }[];
};

type IContractContext = {
  data: IContractData;
  isLoading: boolean;
  error: string;
};

type IContractProviderProps = {
  projectId: string;
  contractId: string;
};

const INITIAL_CONTRACT_DATA = {
  contract: {} as any,
  sections: [],
  accounts: [],
};

const ContractContext = createContext<IContractContext>({
  data: INITIAL_CONTRACT_DATA,
  isLoading: false,
  error: '',
});

export const useContractContext = () => useContext(ContractContext);

export const ContractProvider = ({
  projectId,
  contractId,
  children,
}: PropsWithChildren<IContractProviderProps>) => {
  const [contract, setContract] = useState<IContractData['contract']>(
    {} as any,
  );
  const [accounts, setAccounts] = useState<IContractData['accounts']>([]);
  const [sections, setSections] = useState<IContractData['sections']>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const contractPath = `/projects/${projectId}/contract/${contractId}`;
  useEffect(() => {
    const contractSubscription = onSnapshot(
      doc(firestore, contractPath),
      (snapshot) => {
        if (!snapshot.exists()) {
          setContract(null);
        } else {
          setContract({
            id: snapshot.id,
            ...(snapshot.data() as IContractDoc),
          });
        }
      },
    );
    const accountsSubscription = onSnapshotHandler({
      collectionRef: collection(firestore, `${contractPath}/accounts`),
      setData: setAccounts,
      setIsLoading,
      setError: (e) => setError((prev) => `${prev}\n${e}`),
    });
    const sectionsSubscription = onSnapshotHandler({
      collectionRef: collection(firestore, `${contractPath}/sections`),
      setData: setSections,
      setIsLoading,
      setError: (e) => setError((prev) => `${prev}\n${e}`),
    });

    return () =>
      [
        contractSubscription,
        accountsSubscription,
        sectionsSubscription,
      ].forEach((unsubscribe) => unsubscribe());
  }, [contractPath]);

  return (
    <ContractContext.Provider
      value={{ data: { accounts, sections, contract }, isLoading, error }}
    >
      {children}
    </ContractContext.Provider>
  );
};
