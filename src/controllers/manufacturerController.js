import { responseCodes } from '../helpers/responseCodes.js';

import Manufacturer from '../models/manufacturer.js';

// Create a new Manufacturer
export const createManufacturer = async (req, res) => {
  try {
    const { name } = req.body;
    const manufacturer = await Manufacturer.create({ name });
    res.status(responseCodes.Created).json(manufacturer);
  } catch (error) {
    res.status(responseCodes.InternalServerError).json({ error: error.message });
  }
};

// Get all Manufacturers
export const getAllManufacturers = async (_req, res) => {
  try {
    const manufacturers = await Manufacturer.find();
    res.status(responseCodes.Ok).json({ manufacturers });
  } catch (error) {
    res.status(responseCodes.InternalServerError).json({ error: error.message });
  }
};

// Get Manufacturer by ID
export const getManufacturerById = async (req, res) => {
  try {
    const { id } = req.params;

    Manufacturer.findById(id).then((resp) => res.status(responseCodes.Ok).json({ manufacturer: resp }));
  } catch (error) {
    res.status(responseCodes.InternalServerError).json({ error: error.message });
  }
};

// Update Manufacturer by ID
export const updateManufacturer = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const manufacturer = await Manufacturer.findByIdAndUpdate(id, { name }, { new: true });
    if (!manufacturer) {
      return res.status(responseCodes.NotFound).json({ error: 'Manufacturer not found.' });
    }

    res.status(responseCodes.Ok).json({ manufacturer });
  } catch (error) {
    res.status(responseCodes.InternalServerError).json({ error: error.message });
  }
};

// Delete Manufacturer by ID
export const deleteManufacturer = async (req, res) => {
  try {
    const { id } = req.params;
    await Manufacturer.deleteOne({ _id: id });

    res.status(204).send();
  } catch (error) {
    res.status(responseCodes.InternalServerError).json({ error: error.message });
  }
};
