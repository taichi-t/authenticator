import * as express from 'express';

const authRouter: express.Router = express.Router();

authRouter.get('/google', (req, res) => {
  res.json('google authentication');
});
authRouter.get('/google/callback', (req, res) => {
  res.json('google authentication callback');
});

export default authRouter;
