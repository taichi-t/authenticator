import express from 'express';
import { errorHandler, logErrors, notFound } from '@/middleware/error';
import { SESSION } from '@/config/index';
import configPassport from '@/config/passport/index';
import cors from 'cors';
import expressSession from 'express-session';
import MongoDb from '@/db/index';
import apiRouter from './routes/index';

const port = process.env.PORT || 8080;
const env = process.env.NODE_ENV;
const app: express.Application = express();

// Express body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Express session
const session = {
  secret: SESSION.secret,
  cookie: { secure: false, maxAge: null },
  resave: false,
  saveUninitialized: false,
};
if (env === 'production') {
  app.set('trust proxy', 1);
  session.cookie.secure = true;
}
app.use(expressSession(session));

// Passport
configPassport(app);

// Router
app.use('/api', apiRouter);

// MongoDb
MongoDb.connectDb();

// catch 404 and forward to error handler
app.get('*', notFound);

// error handler
app.use(logErrors);
app.use(errorHandler);
app.listen(port, () =>
  console.log(`🌏 Server listening on port: http://localhost:${port}/`)
);