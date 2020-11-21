import * as express from 'express';
import authRouter from './auth';

const apiRouter: express.Router = express.Router();

apiRouter.use('/auth', authRouter);

apiRouter.get('/', (req, res) => {
  res.json('index now!!');
});

export default apiRouter;
