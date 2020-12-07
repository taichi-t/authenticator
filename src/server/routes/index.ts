import * as express from 'express';
import authRouter from '@/server/routes/auth';

const apiRouter: express.Router = express.Router();

apiRouter.use('/auth', authRouter);

export default apiRouter;
