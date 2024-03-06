import { responseCodes } from '../helpers/responseCodes.js';
import { notFoundError } from '../helpers/errorMessages.js';

import Manufacturer from '../models/manufacturer.js';

// Create a new manufacturer
export const createManufacturer = async (req, res) => {
  try {
    const { name } = req.body;
    if (findByName(name)) {
      res.status(responseCodes.Conflict).json({ error: duplicateError('Name') });
    } else {
      const manufacturer = await Manufacturer.create({ name });
      res.status(responseCodes.Created).json(manufacturer);
    }
  } catch (error) {
    res.status(responseCodes.InternalServerError).json({ error: error.message });
  }
};

// Get all manufacturers
export const getAllManufacturers = async (_req, res) => {
  try {
    const manufacturers = await Manufacturer.findAll();
    res.status(responseCodes.Ok).json(manufacturers);
  } catch (error) {
    res.status(responseCodes.InternalServerError).json({ error: error.message });
  }
};

// Get manufacturer by ID
export const getManufacturerById = async (req, res) => {
  try {
    const { id } = req.params;
    const manufacturer = findById(id);
    if (!manufacturer) {
      return res.status(responseCodes.NotFound).json({ message: notFoundError('Category') });
    }
    res.status(responseCodes.Ok).json(manufacturer);
  } catch (error) {
    res.status(responseCodes.InternalServerError).json({ error: error.message });
  }
};

// Update manufacturer by ID
export const updateManufacturer = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const manufacturer = findById(id);
    if (!manufacturer) {
      return res.status(responseCodes.NotFound).json({ message: notFoundError('Manufacturer') });
    } else if (findByName(name)) {
      res.status(responseCodes.Conflict).json({ error: duplicateError('Name') });
    } else {
      await manufacturer.update({ name });
      res.status(responseCodes.Ok).json(manufacturer);
    }
  } catch (error) {
    res.status(responseCodes.InternalServerError).json({ error: error.message });
  }
};

// Delete manufacturer by ID
export const deleteManufacturer = async (req, res) => {
  try {
    const { id } = req.params;
    const manufacturer = findById(id);
    if (!manufacturer) {
      return res.status(responseCodes.NotFound).json({ message: notFoundError('Manufacturer') });
    }
    await manufacturer.destroy();
    res.status(responseCodes.NoContent).send();
  } catch (error) {
    res.status(responseCodes.InternalServerError).json({ error: error.message });
  }
};

const findByName = async (manufacturerName = '') =>
  await Manufacturer.findOne({
    where: {
      name: manufacturerName,
    },
  });

const findById = async (id) => await Manufacturer.findByPk(id);
