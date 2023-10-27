import mongoose from 'mongoose';
import RequestCountNextSchema from '@/models/RequestCountNext';


function store() {
  if (
    process.env.MONGOOSE_ATLAS_CONNECTION_STRING
    && process.env.MONGOOSE_ATLAS_PASSWORD
  ) {
      const uri = process.env.MONGOOSE_ATLAS_CONNECTION_STRING.replace(
        '<password>',
        encodeURIComponent(process.env.MONGOOSE_ATLAS_PASSWORD)
      );

      return (
        mongoose.connect(uri)
          .then(() => {
            if (RequestCountNextSchema) {
              const model = mongoose.model('RequestCountNext', RequestCountNextSchema);
              return model;
            }
          })
      );
    }
}

export default store;