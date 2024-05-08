import { doc, setDoc } from 'firebase/firestore';
import { firestore } from '@/lib/firebase';
import { MOCK_MILESTONES_DATA } from '@/lib/mock/milestones';
import { handler } from '../middleware/handler';

type Data = {
  success: boolean;
};

async function seed(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    for (const { id, path, ...data } of MOCK_MILESTONES_DATA) {
      const docRef = doc(firestore, `${path}/milestones/${id}`);
      setDoc(docRef, data, { merge: true });
    }
    res.status(200).json({ success: true });
  } catch (e) {
    res.status(400).json({ success: false });
  }
}
export default handler(seed);
