import { FirebaseError } from 'firebase/app';
import { toast } from 'react-toastify';

export const showToastError = (err: unknown) => {
  toast.error(
    err instanceof FirebaseError
      ? err.message
      : JSON.stringify(err ?? { error: 'Unexpected Error' }),
  );
};
