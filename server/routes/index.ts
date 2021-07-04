import * as express from 'express';
import authRouter from '@/routes/auth';

const apiRouter: express.Router = express.Router();

apiRouter.use('/auth', authRouter);

export default apiRouter;
