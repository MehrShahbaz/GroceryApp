import mongoose, { Schema } from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  manufacturer: { type: Schema.Types.ObjectId, ref: 'Manufacturer', required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  store: { type: Schema.Types.ObjectId, ref: 'Store', required: true },
  price: { type: Number, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model('Product', productSchema);

export default Product;
