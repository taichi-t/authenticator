import express from 'express';
import { errorHandler } from '@/server/middleware/error';
import boom from '@hapi/boom';
import mongoose from 'mongoose';
import apiRouter from './routes/index';
import MDBConnect from './middleware/connectDb';

const port = process.env.PORT || 3333;

const app: express.Application = express();

app.use(apiRouter);

app.use(MDBConnect.connectDb);

const db = mongoose.connection;
db.on('error', (err: Error) => {
  const error = boom.badGateway('Error connecting db', err);
  throw error;
});
db.once('open', () => console.log('Succcessfully connected'));

app.use(errorHandler);

app.listen(port, () => console.log(`Server listening on port: ${port}`));
