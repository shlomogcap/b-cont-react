import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { IProjectDoc } from '../consts/projects/ProjectDoc';
import { firestore } from '@firebase';
import { collection } from 'firebase/firestore';
import { onSnapshotHandler } from '../utils/onSnapshotHandler';

type IProjectsContext = {
  data: IProjectDoc[];
  isLoading: boolean;
  error: string;
};

type IProjectsProviderProps = {};

const ProjectsContext = createContext<IProjectsContext>({
  data: [],
  isLoading: false,
  error: '',
});

export const useProjectsContext = () => useContext(ProjectsContext);

export const ProjectsProvider = ({
  children,
}: PropsWithChildren<IProjectsProviderProps>) => {
  const [data, setData] = useState<IProjectDoc[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const collectionRef = collection(firestore, 'projects');

    const unsubscribe = onSnapshotHandler({
      collectionRef,
      setIsLoading,
      setData,
      setError,
    });

    return () => unsubscribe();
  }, []);

  return (
    <ProjectsContext.Provider value={{ data, isLoading, error }}>
      {children}
    </ProjectsContext.Provider>
  );
};
