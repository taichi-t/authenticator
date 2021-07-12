import express from 'express';
import MongoStore from 'connect-mongo';
import { errorHandler, logErrors, notFound } from '@/middleware/error';
import { BASE_CLIENT_URL, SESSION } from '@/config/index';
import configPassport from '@/config/passport/index';
import cors from 'cors';
import expressSession from 'express-session';
import MongoDb from '@/db/index';
import apiRouter from './routes/index';

const port = process.env.PORT || 8080;
const env = process.env.NODE_ENV;
const app: express.Application = express();

// Cors
app.use(
  cors({
    credentials: true,
    origin: BASE_CLIENT_URL,
  })
);

// Express body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Express session

app.enable('trust proxy');
app.use(
  expressSession({
    secret: SESSION.secret,
    cookie: {
      secure: env === 'production',
      sameSite: env === 'production' ? 'none' : 'lax',
      maxAge: 6 * 24 * 60 * 60, // =  6days. Default
    },
    proxy: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URL,
      dbName: 'auth',
      ttl: 6 * 24 * 60 * 60, // =  6days. Default
    }),
    saveUninitialized: false, // don't create session until something stored
    resave: false, // don't save session if unmodified
  })
);

// ref: https://tech.chakapoko.com/nodejs/express/session.html
// ref: https://qiita.com/MahoTakara/items/8495bbafc19859ef463b

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
