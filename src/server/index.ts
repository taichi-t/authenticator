import express from 'express';
import { errorHandler, logErrors, notFound } from '@/server/middleware/error';
import { SESSION } from '@/config/index';

import cors from 'cors';
import passport from 'passport';
import expressSession from 'express-session';
import apiRouter from './routes/index';
import MongoDb from './middleware/connectDb';

const port = process.env.PORT || 8080;
const env = process.env.NODE_ENV;
const app: express.Application = express();

// Express body parser
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Express session
const session = {
  secret: SESSION.secret,
  cookie: { secure: false, maxAge: 60000 },
  resave: false,
  saveUninitialized: false,
};
if (env === 'production') {
  app.set('trust proxy', 1);
  session.cookie.secure = true;
}
app.use(expressSession(session));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Router
app.use('/api', apiRouter);

// MongoDb
app.use(MongoDb.connectDb);

// catch 404 and forward to error handler
app.get('*', notFound);

// error handler
app.use(logErrors);
app.use(errorHandler);
app.listen(port, () =>
  console.log(`🌏 Server listening on port: http://localhost:${port}/`)
);
