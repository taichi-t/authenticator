import boom from '@hapi/boom';
import mongoose from 'mongoose';
import MongoDb from '../db/index';

describe('connectDb', () => {
  let connection;
  let db: mongoose.Connection;

  // const nextFunction: NextFunction = jest.fn();

  beforeAll(async () => {
    connection = await MongoDb.connectDb;
    db = mongoose.connection;
    // db.on('error', (err) => {
    //   done.fail(err);
    // });

    // db.once('open', () => {
    //   done();
    // });
  });

  afterAll(async () => {
    await connection.close();
    await db.close();
  });

  it('shoud return error when connection is failed', () => {
    const mockFn = async (done) => {
      db.on('error', (err) => {
        const mockError = boom.badGateway('Error connecting db', err);
        done(fail(mockError));
      });
    };
    expect(mockFn).rejects.toThrow();
  });
});
