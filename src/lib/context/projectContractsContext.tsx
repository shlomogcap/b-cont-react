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

type TProjectContractsContext = {
  data: IContractDoc[];
  isLoading: boolean;
  error: string;
};

type TProjectContractsProviderProps = {
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
    const collectionRef = collection(
      firestore,
      `projects/${projectId}/contracts`,
    );

    const unsubscribe = onSnapshotHandler({
      collectionRef,
      setIsLoading,
      setData,
      setError,
    });

    return () => unsubscribe();
  }, [projectId]);

  return (
    <ProjectContractsContext.Provider value={{ data, isLoading, error }}>
      {children}
    </ProjectContractsContext.Provider>
  );
};
