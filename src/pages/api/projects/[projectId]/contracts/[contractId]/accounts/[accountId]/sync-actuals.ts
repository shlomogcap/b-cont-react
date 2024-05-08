import { handler } from '../../../../../../middleware/handler';
import { firestore } from 'firebase-admin';
import { HttpMethod, methodsGuard } from '@/pages/api/middleware/method';
import { isAuthedUser } from '@/pages/api/middleware/isAuthedUser';
import { sumBy } from 'lodash-es';
import { EActualFields } from '@/lib/consts/actuals/ActualFields';
import { FirebaseError } from 'firebase/app';
import { EAccountFields } from '@/lib/consts/accounts/AccountFields';
import { EContractFields, IContractDoc } from '@/lib/consts/contracts';
import { safeDivide } from '@/lib/utils/numberUtils';

type Data = {
  success: boolean;
  data?: object;
  updated?: object;
  error?: string;
};

async function syncActuals(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    console.log('POST accountSyncActuals');
    const { projectId, contractId, accountId } = req.query;
    const contractPath = `projects/${projectId}/contracts/${contractId}`;
    const contractQuery = await firestore().doc(contractPath).get();
    const accountQuery = await firestore()
      .doc(`${contractPath}/accounts/${accountId}`)
      .get();
    const actualsQuery = await firestore()
      .collection(`${contractPath}/actuals`)
      .get();

    const contract = {
      id: contractQuery.id,
      ...contractQuery.data(),
    } as IContractDoc;
    const actuals = actualsQuery.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    const totalSections = sumBy(actuals, EActualFields.CurrentTotal);
    const totalAdditions = 0; //TODO: sumBy(additions, EActualFields.CurrentTotal);
    const totalSubtractions = 0; //TODO: sumBy(subtractions, EActualFields.CurrentTotal);
    const accumulatedTotal = totalSections + totalAdditions - totalSubtractions;
    const delayPercentage = safeDivide(
      contract[EContractFields.DelayPercentage],
      100,
    );
    const totalDelay = accumulatedTotal * delayPercentage;
    const totalAccountToPay = accumulatedTotal - totalDelay;

    const indexedPercentage = contract[EContractFields.IsIndexed]
      ? safeDivide(contract[EContractFields.IndexedPercentage], 100)
      : 0;
    const totalIndexed = totalAccountToPay * indexedPercentage;
    const vatPercentage = safeDivide(17, 100) || 0;
    const totalVAT = totalAccountToPay * vatPercentage;
    const taxPercentage = safeDivide(0, 100); //TODO: get from vendor
    const totalTax = totalAccountToPay * taxPercentage;
    const updated = {
      [EAccountFields.TotalSections]: totalSections,
      [EAccountFields.TotalSubtractions]: totalSubtractions,
      [EAccountFields.TotalAdditions]: totalAdditions,
      [EAccountFields.AccumulatedTotal]: accumulatedTotal,
      [EAccountFields.DelayPercentage]: delayPercentage,
      [EAccountFields.TotalDelay]: totalDelay,
      [EAccountFields.TotalAccountToPay]: totalAccountToPay,
      [EAccountFields.IndexedPercent]: indexedPercentage,
      [EAccountFields.TotalIndexed]: totalIndexed,
      [EAccountFields.TotalAfterIndexed]:
        totalAccountToPay - totalDelay - totalIndexed,
      [EAccountFields.VatPercent]: vatPercentage,
      [EAccountFields.TotalVAT]: totalVAT,
      [EAccountFields.TaxPercent]: taxPercentage,
      [EAccountFields.TotalTax]: totalTax,
      [EAccountFields.TotalToPay]:
        totalAccountToPay + totalVAT - totalTax - totalIndexed,
    };
    console.log(updated);
    await accountQuery.ref.update(updated);
    res.status(201).json({
      success: true,
      data: {
        account: { id: accountQuery.id, ...accountQuery.data() },
        actuals,
      },
      updated,
    });
  } catch (e) {
    const error =
      e instanceof FirebaseError
        ? e.message
        : JSON.stringify(e) ?? 'Unexpected Error';
    res.status(400).json({ success: false, error });
  }
}

export default handler(
  methodsGuard([HttpMethod.Post]),
  isAuthedUser(),
  syncActuals,
);
