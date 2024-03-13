import mongoose, { Schema } from 'mongoose';

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  location: {
    type: String,
    unique: true,
    required: true,
  },
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Store = mongoose.model('Store', storeSchema);

export default Store;
