import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const manufacturerSchema = new mongoose.Schema({
  name: {
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

const Manufacturer = mongoose.model('Manufacturer', manufacturerSchema);

export default Manufacturer;
