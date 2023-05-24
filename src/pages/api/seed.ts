import type { NextApiRequest, NextApiResponse } from 'next';
import firebase from '@firebase';
import { MOCK_PROJECTS_DATA } from '@/lib/mock/projects';

type Data = {
  success: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
    const colRef = firebase.firestore().collection('projects');
    for (const project of MOCK_PROJECTS_DATA) {
      const isEmpty = (await colRef.where('id', '==', project.id).get()).empty;
      if (isEmpty) {
        colRef.add(project);
      }
    }
    res.status(200).json({ success: true });
  } catch (e) {
    res.status(400).json({ success: false });
  }
}
