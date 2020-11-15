import mongoose from 'mongoose';

const options = {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

class MDBConnect {
  static connectDb() {
    mongoose.connect(process.env.MONGODB_URL, options);
  }

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

export default MDBConnect;
