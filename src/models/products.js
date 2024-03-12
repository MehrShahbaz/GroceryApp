import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  manufacturerId: { type: Schema.Types.ObjectId, ref: 'Manufacturer', required: true },
  categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model('Product', productSchema);

export default Product;
