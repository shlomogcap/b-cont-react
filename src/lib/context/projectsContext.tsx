import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { IProjectDoc } from '../consts/projects/ProjectDoc';
import firebase from '@firebase';

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
    const collectionRef = firebase.firestore().collection('projects');

    const unsubscribe = collectionRef.onSnapshot(
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
            } as IProjectDoc;
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
        setError('Error fetching projects');
        setIsLoading(false);
        console.error(error);
      },
    );

    return () => unsubscribe();
  }, []);

  return (
    <ProjectsContext.Provider value={{ data, isLoading, error }}>
      {children}
    </ProjectsContext.Provider>
  );
};
