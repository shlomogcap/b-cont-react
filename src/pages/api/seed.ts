import type { NextApiRequest, NextApiResponse } from 'next';
import { MOCK_PROJECTS_DATA } from '@/lib/mock/projects';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '@/lib/firebase';

type Data = {
  success: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
    const colRef = collection(firestore, 'projects');
    for (const project of MOCK_PROJECTS_DATA) {
      const q = query(colRef, where('id', '==', project.id));
      const isEmpty = (await getDocs(q)).empty;
      if (isEmpty) {
        addDoc(colRef, project);
      }
    }
    res.status(200).json({ success: true });
  } catch (e) {
    res.status(400).json({ success: false });
  }
}
