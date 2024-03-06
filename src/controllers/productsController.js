import { responseCodes } from '../helpers/responseCodes.js';
import { notFoundError } from '../helpers/errorMessages.js';

import Product from '../models/products.js';

// Create a new product
export const createProduct = async (req, res) => {
  try {
    const { name, companyId, categoryId } = req.body;
    const product = await Product.create({ name, companyId, categoryId });
    res.status(responseCodes.Created).json(product);
  } catch (error) {
    res.status(responseCodes.InternalServerError).json({ error: error.message });
  }
};

// Get all products
export const getProducts = async (_req, res) => {
  try {
    const products = await Product.findAll();
    res.status(responseCodes.Ok).json(products);
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

// Update product by ID
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, companyId, categoryId } = req.body;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(responseCodes.NotFound).json({ message: notFoundError('Product') });
    }
    await product.update({ name, companyId, categoryId });
    res.status(responseCodes.Ok).json(product);
  } catch (error) {
    res.status(responseCodes.InternalServerError).json({ error: error.message });
  }
};

// Delete product by ID
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(responseCodes.NotFound).json({ message: notFoundError('Product') });
    }
    await product.destroy();
    res.status(responseCodes.NoContent).send();
  } catch (error) {
    res.status(responseCodes.InternalServerError).json({ error: error.message });
  }
};
