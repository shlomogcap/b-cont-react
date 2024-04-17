import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { firestore } from '@firebase';
import { collection } from 'firebase/firestore';
import { onSnapshotHandler } from '../utils/onSnapshotHandler';
import { IConfirmDoc } from '../consts/confirms/ConfirmDoc';

type IProjectConfirmsSettingsContext = {
  data: IConfirmDoc[];
  isLoading: boolean;
  error: string;
};

type IProjectConfirmsSettingsProviderProps = {
  projectId: string;
};

const ProjectConfirmsSettingsContext =
  createContext<IProjectConfirmsSettingsContext>({
    data: [],
    isLoading: false,
    error: '',
  });

export const useProjectConfirmsSettingsContext = () =>
  useContext(ProjectConfirmsSettingsContext);

export const ProjectConfirmsSettingsProvider = ({
  projectId,
  children,
}: PropsWithChildren<IProjectConfirmsSettingsProviderProps>) => {
  const [data, setData] = useState<IConfirmDoc[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    const queryRef = collection(
      firestore,
      `projects/${projectId}/confirmsSettings`,
    );

    const unsubscribe = onSnapshotHandler({
      queryRef,
      setIsLoading,
      setData,
      setError,
    });

    return () => unsubscribe();
  }, [projectId]);

  return (
    <ProjectConfirmsSettingsContext.Provider value={{ data, isLoading, error }}>
      {children}
    </ProjectConfirmsSettingsContext.Provider>
  );
};
