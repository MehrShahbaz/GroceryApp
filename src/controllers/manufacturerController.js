import Manufacturer from '../models/manufacturer.js';

// Create a new manufacturer
export const createManufacturer = async (req, res) => {
  try {
    const { name } = req.body;
    const manufacturer = await Manufacturer.create({ name });
    res.status(201).json(manufacturer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all manufacturers
export const getAllManufacturers = async (_req, res) => {
  try {
    const manufacturers = await Manufacturer.findAll();
    res.status(200).json(manufacturers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get manufacturer by ID
export const getManufacturerById = async (req, res) => {
  try {
    const { id } = req.params;
    const manufacturer = await Manufacturer.findByPk(id);
    if (!manufacturer) {
      return res.status(404).json({ message: 'Manufacturer not found' });
    }
    res.status(200).json(manufacturer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update manufacturer by ID
export const updateManufacturer = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const manufacturer = await Manufacturer.findByPk(id);
    if (!manufacturer) {
      return res.status(404).json({ message: 'Manufacturer not found' });
    }
    await manufacturer.update({ name });
    res.status(200).json(manufacturer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete manufacturer by ID
export const deleteManufacturer = async (req, res) => {
  try {
    const { id } = req.params;
    const manufacturer = await Manufacturer.findByPk(id);
    if (!manufacturer) {
      return res.status(404).json({ message: 'Manufacturer not found' });
    }
    await manufacturer.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
