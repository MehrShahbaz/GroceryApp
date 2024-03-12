import { responseCodes } from '../helpers/responseCodes.js';

import Store from '../models/store.js';

// Create a new Store
export const createStore = async (req, res) => {
  try {
    const { name, location } = req.body;
    const store = await Store.create({ name, location });
    res.status(responseCodes.Created).json(Store);
  } catch (error) {
    res.status(responseCodes.InternalServerError).json({ error: error.message });
  }
};

// Get all Stores
export const getAllStores = async (_req, res) => {
  try {
    const stores = await Store.find();
    res.status(responseCodes.Ok).json({ stores });
  } catch (error) {
    res.status(responseCodes.InternalServerError).json({ error: error.message });
  }
};

// Get Store by ID
export const getStoreById = async (req, res) => {
  try {
    const { id } = req.params;

    Store.findById(id).then((resp) => res.status(responseCodes.Ok).json({ store: resp }));
  } catch (error) {
    res.status(responseCodes.InternalServerError).json({ error: error.message });
  }
};

// Update Store by ID
export const updateStore = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const store = await Store.findByIdAndUpdate(id, { name }, { new: true });
    if (!store) {
      return res.status(responseCodes.NotFound).json({ error: 'Store not found.' });
    }

    res.status(responseCodes.Ok).json({ Store });
  } catch (error) {
    res.status(responseCodes.InternalServerError).json({ error: error.message });
  }
};

// Delete Store by ID
export const deleteStore = async (req, res) => {
  try {
    const { id } = req.params;
    await Store.deleteOne({ _id: id });

    res.status(204).send();
  } catch (error) {
    res.status(responseCodes.InternalServerError).json({ error: error.message });
  }
};
