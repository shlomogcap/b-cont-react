import { handler } from '../../../../middleware/handler';
import { firestore } from 'firebase-admin';
import { isAuthedUser } from '@/pages/api/middleware/isAuthedUser';
import { HttpMethod, methodsGuard } from '@/pages/api/middleware/method';
import axios from 'axios';
import { getAbsoluteApiPath, getAuthorizationHeader } from '@/pages/api/_utils';
import { EAccountFields } from '@/lib/consts/accounts/AccountFields';
import { EContractFields } from '@/lib/consts/contracts';
import { sumBy } from 'lodash-es';

type IResult = { [key in EAccountFields]: number };

type Data = {
  success: boolean;
  result?: IResult[];
  updated?: object;
  error?: string;
};

async function syncContractActuals(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
    const contractPath = `projects/${req.query.projectId}/contracts/${req.query.contractId}`;
    const contractAccountsPath = `${contractPath}/accounts`;
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
        headers: getAuthorizationHeader(req),
      });
    });
    const result: IResult[] = (await Promise.all(accountsSyncPromises)).map(
      (res) => res.data.updated,
    );
    console.log('[RESULT]: ', result);
    const updated = {
      [EContractFields.TotalActualsSum]: sumBy(
        result,
        EAccountFields.AccumulatedTotal,
      ),
    };
    await firestore().doc(contractPath).set(updated, { merge: true });
    console.log('[UPDATED]: ', updated);

    res.status(200).json({
      success: true,
      result,
      updated,
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
