import { responseCodes } from '../helpers/responseCodes.js';
import { duplicateError, notFoundError } from '../helpers/errorMessages.js';

import Category from '../models/category.js';

// Create a new category
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.create({ name });
    res.status(responseCodes.Created).json(category);
  } catch (error) {
    res.status(responseCodes.InternalServerError).json({ error: error.message });
  }
};

// Get all categories
export const getCategories = async (_req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json({ categories: categories || [] });
  } catch (error) {
    return res.status(responseCodes.InternalServerError).json({ error: error.message });
  }
};

// Get category by ID
export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    Category.findById(id).then((resp) => res.status(responseCodes.Ok).json({ category: resp }));
  } catch (error) {
    res.status(responseCodes.InternalServerError).json({ error: error.message });
  }
};

// Update category by ID
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const category = await Category.findByIdAndUpdate(id, { name }, { new: true });
    if (!category) {
      return res.status(responseCodes.NotFound).json({ error: 'Category not found.' });
    }

    res.status(responseCodes.Ok).json({ category });
  } catch (error) {
    res.status(responseCodes.InternalServerError).json({ error: error.message });
  }
};

// Delete category by ID
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await Category.deleteOne({ _id: id });

    res.status(204).send();
  } catch (error) {
    res.status(responseCodes.InternalServerError).json({ error: error.message });
  }
};


