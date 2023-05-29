import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { firestore } from '@firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { IVendorDoc } from '../consts/vendors';

type IVendorsContext = {
  data: IVendorDoc[];
  isLoading: boolean;
  error: string;
};

type IVendorsProviderProps = {};

const VendorsContext = createContext<IVendorsContext>({
  data: [],
  isLoading: false,
  error: '',
});

export const useVendorsContext = () => useContext(VendorsContext);

export const VendorsProvider = ({
  children,
}: PropsWithChildren<IVendorsProviderProps>) => {
  const [data, setData] = useState<IVendorDoc[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const collectionRef = collection(firestore, 'vendors');

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
            } as IVendorDoc;
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
    <VendorsContext.Provider value={{ data, isLoading, error }}>
      {children}
    </VendorsContext.Provider>
  );
};
