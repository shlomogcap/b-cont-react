import { doc, setDoc } from 'firebase/firestore';
import { firestore } from '@/lib/firebase';
import { MOCK_VENDORS_DATA } from '@/lib/mock/vendors';
import { handler } from '../middleware/handler';

type Data = {
  success: boolean;
};

async function seed(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    for (const { id, ...vendorData } of MOCK_VENDORS_DATA) {
      const docRef = doc(firestore, `vendors/${id}`);
      setDoc(docRef, vendorData, { merge: true });
    }
    res.status(200).json({ success: true });
  } catch (e) {
    res.status(400).json({ success: false });
  }
}

export default handler(seed);
