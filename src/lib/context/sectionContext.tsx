import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { firestore } from '@firebase';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { onSnapshotHandler } from '../utils/onSnapshotHandler';
import { IMilestoneDoc } from '../consts/milestones';
import { ISectionDoc } from '../consts/sections';

type ISectionData = {
  section: ISectionDoc | null;
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
  section: {} as any,
  milestones: [],
};

const SectionContext = createContext<ISecionContext>({
  data: INITIAL_DATA,
  isLoading: false,
  error: '',
});

export const useSectionContext = () => useContext(SectionContext);

export const SectionProvider = ({
  sectionPath,
  children,
}: PropsWithChildren<ISectionProviderProps>) => {
  const [section, setSection] = useState<ISectionData['section']>(null);
  const [milestones, setMilestones] = useState<ISectionData['milestones']>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!sectionPath) {
      return;
    }
    const sectionSubscription = onSnapshot(
      doc(firestore, sectionPath),
      (snapshot) => {
        if (!snapshot.exists()) {
          setSection(null);
        } else {
          setSection({
            ...(snapshot.data() as ISectionDoc),
            path: snapshot.ref.path,
            id: snapshot.id,
          });
        }
      },
    );
    const milestonesSubscription = onSnapshotHandler({
      collectionRef: collection(firestore, `${sectionPath}/milestones`),
      setData: setMilestones,
      setIsLoading,
      setError: (e) => setError((prev) => `${prev}\n${e}`),
    });

    return () =>
      [milestonesSubscription, sectionSubscription].forEach((unsubscribe) =>
        unsubscribe(),
      );
  }, [sectionPath]);

  return (
    <SectionContext.Provider
      value={{
        data: {
          section,
          milestones,
        },
        isLoading,
        error,
      }}
    >
      {children}
    </SectionContext.Provider>
  );
};
