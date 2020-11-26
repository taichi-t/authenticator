import mongoose from 'mongoose';
import boom from '@hapi/boom';

const options = {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

class MongoDb {
  static connectDb = () => {
    mongoose.connect(process.env.MONGODB_URL, options);
    const db = mongoose.connection;

    db.on('error', (err: Error) => {
      const error = boom.badGateway('Error connecting db', err);
      throw error;
    });

    db.once('open', () => {
      console.log('💭 DB connect');
    });
  };

  // static findOne(db, collection, query) {
  //   return MDBConnect.connect(db, collection).then((c) => {
  //     return c.findOne(query).then((result) => {
  //       return result;
  //     });
  //   });
  // }
  // create as many as you want
  // static find(db, collection, query)
  // static insert(db, collection, query)
  // etc etc etc
}

export default MongoDb;
