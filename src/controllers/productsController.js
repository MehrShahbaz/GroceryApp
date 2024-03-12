import { responseCodes } from '../helpers/responseCodes.js';
// import { notFoundError } from '../helpers/errorMessages.js';

import Product from '../models/products.js';
import Category from '../models/category.js';
import Manufacturer from '../models/manufacturer.js';

// Create a new product
export const createProduct = async (req, res) => {
  try {
    const { name, manufacturerId, categoryId } = req.body;

    if (!name || !manufacturerId || !categoryId) {
      return res.status(responseCodes.BadRequest).json({ error: 'Missing required fields.' });
    }

    const manufacturer = await Manufacturer.findById(manufacturerId);
    if (!manufacturer) {
      return res.status(responseCodes.NotFound).json({ error: 'Manufacturer not found.' });
    }

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(responseCodes.NotFound).json({ error: 'Category not found.' });
    }

    const product = await Product.create({ name, manufacturerId, categoryId });

    category.products.push(product._id);
    manufacturer.products.push(product._id);

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      await category.save({ session });
      await manufacturer.save({ session });
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
    const { name, manufacturerId, categoryId } = req.body;

    // Input Validation
    if (!name || !manufacturerId || !categoryId) {
      return res.status(responseCodes.BadRequest).json({ error: 'Missing required fields.' });
    }

    // Check if the manufacturer exists
    const manufacturer = await Manufacturer.findById(manufacturerId);
    if (!manufacturer) {
      return res.status(responseCodes.NotFound).json({ error: 'Manufacturer not found.' });
    }

    // Check if the category exists
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(responseCodes.NotFound).json({ error: 'Category not found.' });
    }

    // Find and update the product
    const product = await Product.findByIdAndUpdate(id, { name, manufacturerId, categoryId }, { new: true });
    if (!product) {
      return res.status(responseCodes.NotFound).json({ error: 'Product not found.' });
    }

    // Update category and manufacturer with product ID
    category.products.push(product._id);
    manufacturer.products.push(product._id);

    // Use a transaction to ensure data consistency
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      await category.save({ session });
      await manufacturer.save({ session });
      await session.commitTransaction();
      session.endSession();

      res.status(responseCodes.Ok).json(product);
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
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
      await Category.findByIdAndUpdate(product.categoryId, { $pull: { products: product._id } }, { session });
      await Manufacturer.findByIdAndUpdate(product.manufacturerId, { $pull: { products: product._id } }, { session });

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
