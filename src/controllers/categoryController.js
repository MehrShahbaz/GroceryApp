import { responseCodes } from '../helpers/responseCodes.js';
import { duplicateError, notFoundError } from '../helpers/errorMessages.js';

import Category from '../models/category.js';

// Create a new category
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (findByName(name)) {
      res.status(responseCodes.Conflict).json({ error: duplicateError('Name') });
    } else {
      const category = await Category.create({ name });
      res.status(responseCodes.Created).json(category);
    }
  } catch (error) {
    res.status(responseCodes.InternalServerError).json({ error: error.message });
  }
};

// Get all categories
export const getCategories = async (_req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(responseCodes.Ok).json(categories);
  } catch (error) {
    res.status(responseCodes.InternalServerError).json({ error: error.message });
  }
};

// Get category by ID
export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!findById(id)) {
      return res.status(404).json({ message: notFoundError('Category') });
    }
    res.status(responseCodes.Ok).json(category);
  } catch (error) {
    res.status(responseCodes.InternalServerError).json({ error: error.message });
  }
};

// Update category by ID
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    if (!findById(id)) {
      return res.status(404).json({ message: notFoundError('Category') });
    } else if (findByName(name)) {
      res.status(responseCodes.Conflict).json({ error: duplicateError('Name') });
    } else {
      await category.update({ name });
      res.status(responseCodes.Ok).json(category);
    }
  } catch (error) {
    res.status(responseCodes.InternalServerError).json({ error: error.message });
  }
};

// Delete category by ID
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: notFoundError('Category') });
    }
    await category.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(responseCodes.InternalServerError).json({ error: error.message });
  }
};

const findByName = async (categoryName = '') =>
  await Category.findOne({
    where: {
      name: categoryName,
    },
  });

const findById = async (id) => await Category.findByPk(id);
