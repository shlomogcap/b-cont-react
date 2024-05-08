import { handler } from '../../middleware/handler';
import { firestore } from 'firebase-admin';
import { IProjectDoc } from '@/lib/consts/projects';
import { isAuthedUser } from '../../middleware/isAuthedUser';
import { HttpMethod, methodsGuard } from '../../middleware/method';

type Data = {
  success: boolean;
  data?: IProjectDoc;
};

async function getProject(req: NextApiRequest, res: NextApiResponse<Data>) {
  const project = await firestore()
    .doc(`projects/${req.query.projectId}`)
    .get();
  try {
    res.status(200).json({
      success: true,
      data: { id: project.id, ...project.data() } as IProjectDoc,
    });
  } catch (e) {
    res.status(400).json({ success: false });
  }
}

export default handler(
  methodsGuard([HttpMethod.Get]),
  isAuthedUser(),
  getProject,
);
