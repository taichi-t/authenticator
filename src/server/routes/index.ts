import * as express from 'express';

const router: express.Router = express.Router();

router.get('/api/hello', (req, res) => {
  res.json('World aa');
});

export default router;
