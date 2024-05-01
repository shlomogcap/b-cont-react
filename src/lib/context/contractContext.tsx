import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { firestore } from '@firebase';
import { collection, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { onSnapshotHandler } from '../utils/onSnapshotHandler';
import {
  EContractFields,
  EContractStage,
  EContractStatus,
  IContractDoc,
} from '../consts/contracts';
import { ISectionDoc } from '../consts/sections';
import { IWorkspaceDoc } from '../consts/workspaces';
import { IAccountDoc } from '../consts/accounts/AccountDoc';
import { IActualDoc } from '../consts/actuals/ActualDoc';
import { CONTRACT_STAGE_QUERY, ERoutesNames } from '../consts/routes';
import { showToastError } from '../utils/showToastError';
import { useRouter } from 'next/router';

type IContractData = {
  contract: IContractDoc | null;
  sections: ISectionDoc[];
  accounts: IAccountDoc[];
  actuals: IActualDoc[];
  workspaces: IWorkspaceDoc[];
  handleChangeContractToPlan: () => void;
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
  actuals: [],
  workspaces: [],
  handleChangeContractToPlan: () => null,
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
  const router = useRouter();

  const [contract, setContract] = useState<IContractData['contract']>(
    {} as any,
  );
  const [actuals, setActuals] = useState<IContractData['actuals']>([]);
  const [accounts, setAccounts] = useState<IContractData['accounts']>([]);
  const [sections, setSections] = useState<IContractData['sections']>([]);
  const [workspaces, setWorkspaces] = useState<IContractData['workspaces']>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const contractPath = `/projects/${projectId}/contracts/${contractId}`;

  const handleChangeContractToPlan = useCallback(async () => {
    try {
      const docRef = doc(firestore, contractPath);
      await updateDoc(docRef, {
        [EContractFields.Status]: EContractStatus.Plan,
      });
      router.push({
        pathname: ERoutesNames.Contract,
        query: {
          ...router.query,
          [CONTRACT_STAGE_QUERY]: EContractStage.Plan,
        },
      });
    } catch (err) {
      showToastError(err);
    }
  }, [contractPath, router]);

  useEffect(() => {
    const contractSubscription = onSnapshot(
      doc(firestore, contractPath),
      (snapshot) => {
        if (!snapshot.exists()) {
          setContract(null);
        } else {
          setContract({
            path: snapshot.ref.path,
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
    const actualsSubscription = onSnapshotHandler({
      collectionRef: collection(firestore, `${contractPath}/actuals`),
      setData: setActuals,
      setIsLoading,
      setError: (e) => setError((prev) => `${prev}\n${e}`),
    });
    const sectionsSubscription = onSnapshotHandler({
      collectionRef: collection(firestore, `${contractPath}/sections`),
      setData: setSections,
      setIsLoading,
      setError: (e) => setError((prev) => `${prev}\n${e}`),
    });
    const workspacesSubscription = onSnapshotHandler({
      collectionRef: collection(firestore, `${contractPath}/workspaces`),
      setData: setWorkspaces,
      setIsLoading,
      setError: (e) => setError((prev) => `${prev}\n${e}`),
    });

    return () =>
      [
        contractSubscription,
        accountsSubscription,
        actualsSubscription,
        sectionsSubscription,
        workspacesSubscription,
      ].forEach((unsubscribe) => unsubscribe());
  }, [contractPath]);

  return (
    <ContractContext.Provider
      value={{
        data: {
          accounts,
          actuals,
          sections,
          contract,
          workspaces,
          handleChangeContractToPlan,
        },
        isLoading,
        error,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};
