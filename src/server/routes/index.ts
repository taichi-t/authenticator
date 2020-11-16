import * as express from 'express';

const router: express.Router = express.Router();

router.get('/api/hello', (req, res) => {
  res.json('World aa');
});

router.get('/api/', (req, res) => {
  res.json('index now!!');
});

export default router;
