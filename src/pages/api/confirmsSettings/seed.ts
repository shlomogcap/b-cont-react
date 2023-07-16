import type { NextApiRequest, NextApiResponse } from 'next';
import { doc, setDoc } from 'firebase/firestore';
import { firestore } from '@/lib/firebase';
import { MOCK_CONFIRMS_SETTINGS_DATA } from '@/lib/mock/confirmsSettings';

type Data = {
  success: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
    for (const { id, path, ...contractData } of MOCK_CONFIRMS_SETTINGS_DATA) {
      const docRef = doc(firestore, `${path}/confirmsSettings/${id}`);
      setDoc(docRef, contractData, { merge: true });
    }
    res.status(200).json({ success: true });
  } catch (e) {
    res.status(400).json({ success: false });
  }
}
