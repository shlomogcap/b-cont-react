import type { NextApiRequest, NextApiResponse } from 'next';
import nookies from 'nookies';
import { HttpMethod, method } from './middleware/method';
import { handler } from './middleware/handler';

type CookiesData = {
  [key: string]: string;
};

type Data = {
  data: CookiesData;
};

const getCookies = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const cookiesData = nookies.get({ req });
  res.status(200).json({ data: cookiesData });
};

export default handler(method([HttpMethod.Get]), getCookies);
