import type { NextApiRequest, NextApiResponse } from 'next';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '@/lib/firebase';
import { MOCK_VENDORS_DATA } from '@/lib/mock/vendors';

type Data = {
  success: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
    const vendorsColRef = collection(firestore, 'vendors');
    for (const vendor of MOCK_VENDORS_DATA) {
      const q = query(vendorsColRef, where('id', '==', vendor.id));
      const isEmpty = (await getDocs(q)).empty;
      if (isEmpty) {
        addDoc(vendorsColRef, vendor);
      }
    }
    res.status(200).json({ success: true });
  } catch (e) {
    res.status(400).json({ success: false });
  }
}
