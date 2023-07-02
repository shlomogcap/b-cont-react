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
import { IMilestoneDoc } from '../consts/milestones';

type ISectionData = {
  milestones: IMilestoneDoc[];
};

type ISecionContext = {
  data: ISectionData;
  isLoading: boolean;
  error: string;
};

type ISectionProviderProps = {
  sectionPath?: string;
};

const INITIAL_DATA = {
  milestones: [],
};

const ContractContext = createContext<ISecionContext>({
  data: INITIAL_DATA,
  isLoading: false,
  error: '',
});

export const useSectionContext = () => useContext(ContractContext);

export const SectionProvider = ({
  sectionPath,
  children,
}: PropsWithChildren<ISectionProviderProps>) => {
  const [milestones, setMilestones] = useState<ISectionData['milestones']>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!sectionPath) {
      return;
    }
    const milestonesSubscription = onSnapshotHandler({
      collectionRef: collection(firestore, `${sectionPath}/milestones`),
      setData: setMilestones,
      setIsLoading,
      setError: (e) => setError((prev) => `${prev}\n${e}`),
    });

    return () =>
      [milestonesSubscription].forEach((unsubscribe) => unsubscribe());
  }, [sectionPath]);

  return (
    <ContractContext.Provider
      value={{
        data: {
          milestones,
        },
        isLoading,
        error,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};
