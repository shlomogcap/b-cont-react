import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { firestore } from '@firebase';
import { collection } from 'firebase/firestore';
import { IProjectAttachmentDoc } from '../consts/projectAttachments';
import { onSnapshotHandler } from '../utils/onSnapshotHandler';

type IProjectAttachmentsContext = {
  data: IProjectAttachmentDoc[];
  isLoading: boolean;
  error: string;
};

type IProjectAttachmentsProviderProps = {
  projectId: string;
};

const ProjectAttachmentsContext = createContext<IProjectAttachmentsContext>({
  data: [],
  isLoading: false,
  error: '',
});

export const useProjectAttachmentsContext = () =>
  useContext(ProjectAttachmentsContext);

export const ProjectOddJobsProvider = ({
  projectId,
  children,
}: PropsWithChildren<IProjectAttachmentsProviderProps>) => {
  const [data, setData] = useState<IProjectAttachmentDoc[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    const queryRef = collection(firestore, `projects/${projectId}/attachments`);

    const unsubscribe = onSnapshotHandler({
      queryRef,
      setIsLoading,
      setData,
      setError,
    });

    return () => unsubscribe();
  }, [projectId]);

  return (
    <ProjectAttachmentsContext.Provider value={{ data, isLoading, error }}>
      {children}
    </ProjectAttachmentsContext.Provider>
  );
};
