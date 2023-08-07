import { DISPLAY_TEXTS, EToastType } from '@/lib/consts/displayTexts';
import { firestore } from '@/lib/firebase';
import { addDoc, collection, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

export const actions = {
  duplicate: async (path: string, type: string) => {
    const SUCCESS_DUPLICATE_TEXT =
      DISPLAY_TEXTS.he.toasts[EToastType.AddingNewDoc];
    const TYPE = DISPLAY_TEXTS.he.toolBar[type];
    const FAIL_DUPLICATe_TEXT = DISPLAY_TEXTS.he.toolBar.duplicate(TYPE);
    try {
      const docRef = doc(firestore, '/n');
      const data = (await getDoc(docRef)).data();
      if (data && Object.entries(data).length) {
        const copyTitle = `copy of ${data.title}`;
        data.title = copyTitle;
        const collectionRef = collection(firestore, `/${type}`);
        await addDoc(collectionRef, data);
      }

      toast.success(DISPLAY_TEXTS.he.toasts[EToastType.AddingNewDoc]);
    } catch {
      toast.error(DISPLAY_TEXTS.he.getToastError(FAIL_DUPLICATe_TEXT));
    }
  },
  delete: async (path: string, type: string) => {
    const SUCCESS_DELETE_TEXT = DISPLAY_TEXTS.he.toasts[EToastType.DeletedDoc];
    const TYPE = DISPLAY_TEXTS.he.toolBar[type];
    const FAIL_DELETE_TEXT = DISPLAY_TEXTS.he.toolBar.delete(TYPE);
    try {
      const docRef = doc(firestore, path);
      await deleteDoc(docRef);
      toast.success(SUCCESS_DELETE_TEXT);
    } catch {
      toast.error(DISPLAY_TEXTS.he.getToastError(FAIL_DELETE_TEXT));
    }
  },
};
