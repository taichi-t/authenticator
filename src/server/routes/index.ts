import * as express from 'express';
import authRouter, { CustomRequest } from '@/server/routes/auth';

const apiRouter: express.Router = express.Router();

apiRouter.use('/auth', authRouter);

apiRouter.use('/user', (req: CustomRequest, res) => {
  const { info } = req.session;
  req.session.info = null;
  if (!req.user) {
    return res
      .status(401)
      .send(info || { message: 'You are not currently logged in' });
  }
  if (info) {
    return res.status(401).send(info);
  }
  return res.json(req.user);
});

export default apiRouter;
