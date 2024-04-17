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

type IProjectOddJobsContext = {
  data: IContractDoc[];
  isLoading: boolean;
  error: string;
};

type IProjectOddJobsProviderProps = {
  projectId: string;
};

const ProjectOddJobsContext = createContext<IProjectOddJobsContext>({
  data: [],
  isLoading: false,
  error: '',
});

export const useProjectOddJobsContext = () => useContext(ProjectOddJobsContext);

export const ProjectOddJobsProvider = ({
  projectId,
  children,
}: PropsWithChildren<IProjectOddJobsProviderProps>) => {
  const [data, setData] = useState<IContractDoc[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    const collectionRef = collection(
      firestore,
      `projects/${projectId}/oddJobs`,
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
    <ProjectOddJobsContext.Provider value={{ data, isLoading, error }}>
      {children}
    </ProjectOddJobsContext.Provider>
  );
};
