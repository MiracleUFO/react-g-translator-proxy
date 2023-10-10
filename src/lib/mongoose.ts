import mongoose from 'mongoose';
import MongooseStore from 'express-brute-mongoose';
import BruteForceSchema from 'express-brute-mongoose/dist/schema';

function store() {
  if (
    process.env.MONGOOSE_CONNECTION_STRING
    && process.env.MONGOOSE_PASSWORD
  ) {
    const uri = process.env.MONGOOSE_CONNECTION_STRING.replace(
      '<password>',
      encodeURIComponent(process.env.MONGOOSE_PASSWORD)
    );

    mongoose.connect(uri)
    const model = mongoose.model(
      'bruteforce',
      new mongoose.Schema(BruteForceSchema)
    );

    const store = new MongooseStore(model);
    return store;
  }
}

export default store();