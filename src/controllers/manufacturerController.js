import Manufacturer from '../models/manufacturer.js';

export async function createManufacturer(req, res) {
  try {
    const { name } = req.body;
    const Manufacturer = await Manufacturer.create({ name });
    res.status(201).json(Manufacturer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
