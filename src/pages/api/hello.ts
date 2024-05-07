// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { handler } from './middleware/handler';
import { HttpMethod, method } from './middleware/method';

type Data = {
  message: string;
};

const hello = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  res.status(200).json({ message: 'Hello John Doe' });
};

export default handler(method([HttpMethod.Get]), hello);
