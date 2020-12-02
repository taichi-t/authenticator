import * as express from 'express';
import UserController from '@/server/controllers/user';
import authRouter from '@/server/routes/auth';

const apiRouter: express.Router = express.Router();
const userController = new UserController();

apiRouter.use('/auth', authRouter);

apiRouter.use('/user', userController.getUser);

export default apiRouter;
