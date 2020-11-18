import express from 'express';
import { errorHandler, logErrors, notFound } from '@/server/middleware/error';

import apiRouter from './routes/index';
import MongoDb from './middleware/connectDb';

const port = process.env.PORT || 8080;

const app: express.Application = express();

app.use(apiRouter);

app.use(MongoDb.connectDb);

// catch 404 and forward to error handler
app.get('*', notFound);

// error handler
app.use(logErrors);

app.use(errorHandler);

app.listen(port, () =>
  console.log(`Server listening on port: http://localhost:${port}/`)
);
