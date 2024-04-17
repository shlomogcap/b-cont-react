import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { firestore } from '@firebase';
import { collection } from 'firebase/firestore';
import { IVendorDoc } from '../consts/vendors';
import { onSnapshotHandler } from '../utils/onSnapshotHandler';

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
    const queryRef = collection(firestore, 'vendors');

    const unsubscribe = onSnapshotHandler({
      queryRef,
      setIsLoading,
      setData,
      setError,
    });

    return () => unsubscribe();
  }, []);

  return (
    <VendorsContext.Provider value={{ data, isLoading, error }}>
      {children}
    </VendorsContext.Provider>
  );
};
