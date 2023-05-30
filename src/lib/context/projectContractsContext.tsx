import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { firestore } from '@firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { IContractDoc } from '../consts/contracts';

type IProjectContractsContext = {
  data: IContractDoc[];
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
    const collectionRef = collection(
      firestore,
      `projects/${projectId}/contracts`,
    );

    const unsubscribe = onSnapshot(
      collectionRef,
      (snapshot) => {
        setIsLoading(true);

        if (snapshot.size === 0) {
          setData([]);
          setIsLoading(false);
        } else {
          snapshot.docChanges().forEach((change) => {
            const docData = {
              ...change.doc.data(),
              id: change.doc.id,
            } as IContractDoc;
            switch (change.type) {
              case 'added':
                setData((prevData) => [...prevData, docData]);
                break;
              case 'modified':
                setData((prevData) =>
                  prevData.map((item) =>
                    item.id === docData.id ? docData : item,
                  ),
                );
                break;
              case 'removed':
                setData((prevData) =>
                  prevData.filter((item) => item.id !== docData.id),
                );
                break;
              default:
                break;
            }
          });

          setIsLoading(false);
        }
      },
      (error) => {
        setError(`Error fetching Contracts for Project ${projectId}`);
        setIsLoading(false);
        console.error(error);
      },
    );

    return () => unsubscribe();
  }, [projectId]);

  return (
    <ProjectContractsContext.Provider value={{ data, isLoading, error }}>
      {children}
    </ProjectContractsContext.Provider>
  );
};
