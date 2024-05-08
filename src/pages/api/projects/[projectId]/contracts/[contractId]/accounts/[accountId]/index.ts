import { IAccountDoc } from '@/lib/consts/accounts/AccountDoc';
import { handler } from '../../../../../../middleware/handler';
import { firestore } from 'firebase-admin';
import { HttpMethod, methodsGuard } from '@/pages/api/middleware/method';
import { isAuthedUser } from '@/pages/api/middleware/isAuthedUser';

type Data = {
  success: boolean;
  data?: IAccountDoc;
};

async function getAccount(req: NextApiRequest, res: NextApiResponse<Data>) {
  const account = await firestore()
    .doc(
      `projects/${req.query.projectId}/contracts/${req.query.contractId}/accounts/${req.query.accountId}`,
    )
    .get();
  try {
    res.status(200).json({
      success: true,
      data: { id: account.id, ...account.data() } as IAccountDoc,
    });
  } catch (e) {
    res.status(400).json({ success: false });
  }
}

export default handler(
  methodsGuard([HttpMethod.Get]),
  isAuthedUser(),
  getAccount,
);
