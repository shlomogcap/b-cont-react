import { handler } from '../../middleware/handler';
import { firestore } from 'firebase-admin';
import { isAuthedUser } from '@/pages/api/middleware/isAuthedUser';
import { HttpMethod, methodsGuard } from '@/pages/api/middleware/method';
import axios from 'axios';
import { getAbsoluteApiPath, getAuthorizationHeader } from '@/pages/api/_utils';

type Data = {
  success: boolean;
  result?: object;
  error?: string;
};

async function syncProjectActuals(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
    const contractsPath = `projects/${req.query.projectId}/contracts`;
    const contractsQuery = await firestore().collection(contractsPath).get();
    const contractSyncPromises = contractsQuery.docs.map(({ id }) => {
      const pathToContractSyncActualsApi = getAbsoluteApiPath(
        req,
        `${contractsPath}/${id}/sync-actuals`,
      );
      console.log('[CALLING]: POST ' + pathToContractSyncActualsApi);
      return axios.post(pathToContractSyncActualsApi, undefined, {
        headers: getAuthorizationHeader(req),
      });
    });
    const result = (await Promise.all(contractSyncPromises)).map(
      (res) => res.data,
    );
    console.log('[RESULT]: ', result);

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
  syncProjectActuals,
);
