import { DISPLAY_TEXTS, EToastType } from '@/lib/consts/displayTexts';
import { firestore } from '@/lib/firebase';
import { addDoc, collection, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { EToolbarText } from './ToolBar.consts';
import { IGetDisplayTextFunc } from './ToolBar.types';

const TOAST_TEXTS = DISPLAY_TEXTS.he.toasts;
const TOOLBAR_TEXTS = DISPLAY_TEXTS.he.toolbar;

export const actions = {
  duplicate: async (path: string, type: EToolbarText) => {
    try {
      const docRef = doc(firestore, path);
      const data = (await getDoc(docRef)).data();
      if (data && Object.entries(data).length) {
        const copyTitle = `${TOOLBAR_TEXTS[EToolbarText.CopyOF]} ${data.title}`;
        data.title = copyTitle;
        const collectionRef = collection(firestore, `/${type}`);
        await addDoc(collectionRef, data);
      }

      toast.success(TOAST_TEXTS[EToastType.AddingNewDoc]);
    } catch {
      const duplicateType: string = TOOLBAR_TEXTS[EToolbarText.Duplicate](type);
      toast.error(DISPLAY_TEXTS.he.getToastError(duplicateType));
    }
  },
  delete: async (path: string, type: EToolbarText) => {
    try {
      const docRef = doc(firestore, path);
      await deleteDoc(docRef);
      toast.success(TOAST_TEXTS[EToastType.DeletedDoc]);
    } catch {
      const deleteType: string = TOOLBAR_TEXTS[EToolbarText.Delete](type);
      toast.error(DISPLAY_TEXTS.he.getToastError(deleteType));
    }
  },
};
