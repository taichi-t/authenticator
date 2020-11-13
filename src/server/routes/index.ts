import * as express from 'express';

const router: express.Router = express.Router();

router.get('/api/hello', (req: express.Request, res: express.Response) => {
  res.json('World');
});

export default router;
