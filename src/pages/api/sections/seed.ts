import { doc, setDoc } from 'firebase/firestore';
import { firestore } from '@/lib/firebase';
import { MOCK_SECTIONS_DATA } from '@/lib/mock/sections';
import { handler } from '../middleware/handler';
import { isAuthedUser } from '../middleware/isAuthedUser';
import { HttpMethod, methodsGuard } from '../middleware/method';

type Data = {
  success: boolean;
};

async function seed(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    for (const { id, path, ...data } of MOCK_SECTIONS_DATA) {
      const docRef = doc(firestore, `${path}/sections/${id}`);
      setDoc(docRef, data, { merge: true });
    }
    res.status(200).json({ success: true });
  } catch (e) {
    res.status(400).json({ success: false });
  }
}

export default handler(methodsGuard([HttpMethod.Get]), isAuthedUser(), seed);
