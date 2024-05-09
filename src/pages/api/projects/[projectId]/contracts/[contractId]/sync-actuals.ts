import { handler } from '../../../../middleware/handler';
import { firestore } from 'firebase-admin';
import { isAuthedUser } from '@/pages/api/middleware/isAuthedUser';
import { HttpMethod, methodsGuard } from '@/pages/api/middleware/method';
import axios from 'axios';
import { getAbsoluteApiPath } from '@/pages/api/_utils';

type Data = {
  success: boolean;
  result?: object;
  error?: string;
};

async function syncContractActuals(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
    const contractAccountsPath = `projects/${req.query.projectId}/contracts/${req.query.contractId}/accounts`;
    const accountsQuery = await firestore()
      .collection(contractAccountsPath)
      .get();
    const accountsSyncPromises = accountsQuery.docs.map(({ id }) => {
      const pathToAccountSyncActualsApi = getAbsoluteApiPath(
        req,
        `${contractAccountsPath}/${id}/sync-actuals`,
      );
      console.log('[CALLING]: POST ' + pathToAccountSyncActualsApi);
      return axios.post(pathToAccountSyncActualsApi, undefined, {
        headers: { Authorization: `Bearer ${req.authedUsertoken}` },
      });
    });
    const result = (await Promise.all(accountsSyncPromises)).map(
      (res) => res.data,
    );
    console.log('RESULT: ', result);

    res.status(200).json({
      success: true,
      result: [],
    });
  } catch (e) {
    console.error(e);
    res.status(400).json({ success: false });
  }
}

export default handler(
  methodsGuard([HttpMethod.Post]),
  isAuthedUser(),
  syncContractActuals,
);
