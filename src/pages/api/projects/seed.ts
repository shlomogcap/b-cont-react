import type { NextApiRequest, NextApiResponse } from 'next';
import { MOCK_PROJECTS_DATA } from '@/lib/mock/projects';
import { doc, setDoc } from 'firebase/firestore';
import { firestore } from '@/lib/firebase';

type Data = {
  success: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
    for (const { id, ...vendorData } of MOCK_PROJECTS_DATA) {
      const docRef = doc(firestore, `projects/${id}`);
      setDoc(docRef, vendorData, { merge: true });
    }
    res.status(200).json({ success: true });
  } catch (e) {
    res.status(400).json({ success: false });
  }
}
