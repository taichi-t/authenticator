import express from 'express';
import { errorHandler, logErrors } from '@/server/middleware/error';

import apiRouter from './routes/index';
import MDBConnect from './middleware/connectDb';

const port = process.env.PORT || 8080;

const app: express.Application = express();

app.use(apiRouter);

app.use(MDBConnect.connectDb);

app.listen(port, () =>
  console.log(`Server listening on port: http://localhost:${port}/`)
);

app.use(logErrors);

app.use(errorHandler);
