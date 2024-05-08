import { Middleware, NextFunction } from './handler';
import { auth } from 'firebase-admin';
import nookies from 'nookies';

export const isAuthedUser =
  (): Middleware =>
  async (req: NextApiRequest, res: NextApiResponse, next: NextFunction) => {
    try {
      const { token } = nookies.get({ req });
      const authedUser = await auth().verifyIdToken(token);
      req.authedUser = authedUser;
      next();
    } catch (err) {
      res.status(401).json({
        success: false,
        message: `Unauthorized user`,
      });
    }
  };
