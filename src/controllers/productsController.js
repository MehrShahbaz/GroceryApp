import { responseCodes } from '../helpers/responseCodes.js';
// import { notFoundError } from '../helpers/errorMessages.js';

import Product from '../models/products.js';
import Category from '../models/category.js';
import Manufacturer from '../models/manufacturer.js';
import Store from '../models/store.js';

// Create a new product
export const createProduct = async (req, res) => {
  try {
    const { name, manufacturer, category, store, price } = req.body;

    if (!name || !manufacturer || !category || !store) {
      return res.status(responseCodes.BadRequest).json({ error: 'Missing required fields.' });
    }

    const currentManufacturer = await Manufacturer.findById(manufacturer);
    if (!currentManufacturer) {
      return res.status(responseCodes.NotFound).json({ error: 'Manufacturer not found.' });
    }

    const currentCategory = await Category.findById(category);
    if (!currentCategory) {
      return res.status(responseCodes.NotFound).json({ error: 'Category not found.' });
    }

    const currentStore = await Store.findById(store);
    if (!currentStore) {
      return res.status(responseCodes.NotFound).json({ error: 'Category not found.' });
    }

    const product = await Product.create({ name, manufacturer, category, store, price });

    currentCategory.products.push(product._id);
    currentManufacturer.products.push(product._id);
    currentStore.products.push(product._id);

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      await currentCategory.save({ session });
      await currentManufacturer.save({ session });
      await currentStore.save({ session });

      await session.commitTransaction();
      session.endSession();

      res.status(responseCodes.Created).json(product);
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  } catch (error) {
    res.status(responseCodes.InternalServerError).json({ error: error.message });
  }
};

// Get all products
export const getProducts = async (_req, res) => {
  try {
    const products = await Product.find();
    res.status(responseCodes.Ok).json({ products });
  } catch (error) {
    res.status(responseCodes.InternalServerError).json({ error: error.message });
  }
};

// Get product by ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(responseCodes.NotFound).json({ message: notFoundError('Product') });
    }
    res.status(responseCodes.Ok).json(product);
  } catch (error) {
    res.status(responseCodes.InternalServerError).json({ error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, manufacturer, category, store, price } = req.body;

    if (!name || !manufacturer || !category || !store) {
      return res.status(responseCodes.BadRequest).json({ error: 'Missing required fields.' });
    }

    const currentManufacturer = await Manufacturer.findById(manufacturer);
    if (!currentManufacturer) {
      return res.status(responseCodes.NotFound).json({ error: 'Manufacturer not found.' });
    }

    const currentCategory = await Category.findById(category);
    if (!currentCategory) {
      return res.status(responseCodes.NotFound).json({ error: 'Category not found.' });
    }

    const currentStore = await Store.findById(store);
    if (!currentStore) {
      return res.status(responseCodes.NotFound).json({ error: 'Category not found.' });
    }

    const product = await Product.findByIdAndUpdate(id, { name, manufacturer, category, store, price }, { new: true });

    if (product) {
      currentCategory.products.push(product._id);
      currentManufacturer.products.push(product._id);
      currentStore.products.push(product._id);

      const session = await mongoose.startSession();
      session.startTransaction();

      try {
        await currentCategory.save({ session });
        await currentManufacturer.save({ session });
        await currentStore.save({ session });

        await session.commitTransaction();
        session.endSession();

        res.status(responseCodes.Ok).json(product);
      } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
      }
    } else {
      return res.status(responseCodes.NotFound).json({ message: notFoundError('Product') });
    }
  } catch (error) {
    res.status(responseCodes.InternalServerError).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the product by ID
    const product = await Product.findById(id);
    if (!product) {
      return res.status(responseCodes.NotFound).json({ error: 'Product not found.' });
    }

    // Use a transaction to ensure data consistency
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Remove the product from its associated category and manufacturer
      await Category.findByIdAndUpdate(product.category, { $pull: { products: product._id } }, { session });
      await Manufacturer.findByIdAndUpdate(product.manufacturer, { $pull: { products: product._id } }, { session });
      await Store.findByIdAndUpdate(product.store, { $pull: { products: product._id } }, { session });

      // Delete the product
      await product.deleteOne({ session });

      await session.commitTransaction();
      session.endSession();

      res.status(responseCodes.Ok).json({ message: 'Product deleted successfully.' });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  } catch (error) {
    res.status(responseCodes.InternalServerError).json({ error: error.message });
  }
};
