import { IContractDoc } from '@/lib/consts/contracts';
import { handler } from '../../../../middleware/handler';
import { firestore } from 'firebase-admin';
import { isAuthedUser } from '@/pages/api/middleware/isAuthedUser';
import { HttpMethod, methodsGuard } from '@/pages/api/middleware/method';

type Data = {
  success: boolean;
  data?: IContractDoc;
};

async function getContract(req: NextApiRequest, res: NextApiResponse<Data>) {
  const contract = await firestore()
    .doc(`projects/${req.query.projectId}/contracts/${req.query.contractId}`)
    .get();
  try {
    res.status(200).json({
      success: true,
      data: { id: contract.id, ...contract.data() } as IContractDoc,
    });
  } catch (e) {
    res.status(400).json({ success: false });
  }
}

export default handler(
  methodsGuard([HttpMethod.Get]),
  isAuthedUser(),
  getContract,
);
