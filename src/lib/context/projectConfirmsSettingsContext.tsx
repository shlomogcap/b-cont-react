import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { auth, firestore } from '@firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import { onSnapshotHandler } from '../utils/onSnapshotHandler';
import { IConfirmDoc } from '../consts/confirms/ConfirmDoc';
import { IAccountDoc } from '../consts/accounts/AccountDoc';
import { EAccountFields } from '../consts/accounts/AccountFields';
import { ECommonFields } from '../consts/commonFields';
import { EConfirmFields } from '../consts/confirms/ConfirmFields';
import { EConfirmStatus } from '../consts/confirms/ConfirmStatus';
import dayjs from 'dayjs';
import { EConfirmFlowControls } from '../consts/confirms/ConfirmFlowControls';
import { showToastError } from '../utils/showToastError';

type IHandleConfirmAccountStageFuncArgs = {
  currentAccount: IAccountDoc;
  confirmFlow: IConfirmDoc[];
};

type IProjectConfirmsSettingsContext = {
  data: IConfirmDoc[];
  handleConfirmAccountStage: (args: IHandleConfirmAccountStageFuncArgs) => void;
  isLoading: boolean;
  error: string;
};

type IProjectConfirmsSettingsProviderProps = {
  projectId: string;
};

const ProjectConfirmsSettingsContext =
  createContext<IProjectConfirmsSettingsContext>({
    data: [],
    handleConfirmAccountStage: () => null,
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

  const handleConfirmAccountStage = useCallback(
    async ({
      currentAccount,
      confirmFlow,
    }: IHandleConfirmAccountStageFuncArgs) => {
      const currentStage = currentAccount?.[EAccountFields.AccountStage];
      const currentConfirmFlow = confirmFlow.find(
        (flow) => flow.id === currentStage,
      );
      const nextConfirmFlow = confirmFlow.find(
        (flow) => flow.id === currentConfirmFlow?.[EConfirmFields.NextConfirm],
      );
      const docRef = doc(firestore, currentAccount[ECommonFields.Path]);
      const preparedData = {
        [EAccountFields.ConfirmFlow]: currentAccount![
          EAccountFields.ConfirmFlow
        ]!.map((flow) =>
          flow.id === currentStage
            ? {
                ...flow,
                [EConfirmFields.ConfirmStatus]: EConfirmStatus.Approve,
                [EConfirmFields.ApprovedAt]: dayjs().toISOString(),
                [EConfirmFields.ApprovedBy]: auth.currentUser?.email ?? '',
              }
            : flow,
        ),
        [EAccountFields.AccountStage]:
          nextConfirmFlow?.id ?? EConfirmFlowControls.End,
      };
      try {
        await setDoc(docRef, preparedData, { merge: true });
      } catch (err) {
        showToastError(err);
      }
    },
    [],
  );

  useEffect(() => {
    const collectionRef = collection(
      firestore,
      `projects/${projectId}/confirmsSettings`,
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
    <ProjectConfirmsSettingsContext.Provider
      value={{ data, isLoading, error, handleConfirmAccountStage }}
    >
      {children}
    </ProjectConfirmsSettingsContext.Provider>
  );
};
