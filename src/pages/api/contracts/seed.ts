import type { NextApiRequest, NextApiResponse } from 'next';
import { MOCK_CONTRACTS_DATA } from '@/lib/mock/contracts';
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
    for (const { id, path, ...contractData } of MOCK_CONTRACTS_DATA) {
      const docRef = doc(firestore, `${path}/contracts/${id}`);
      setDoc(docRef, contractData, { merge: true });
    }
    res.status(200).json({ success: true });
  } catch (e) {
    res.status(400).json({ success: false });
  }
}
