import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const categorySchema = new mongoose.Schema({
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

const Category = mongoose.model('Category', categorySchema);

export default Category;
