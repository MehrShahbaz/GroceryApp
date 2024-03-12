import express from 'express';
import { createStore, getAllStores, getStoreById, updateStore, deleteStore } from '../controllers/storeController.js';

const router = express.Router();

router.post('/store', createStore);

router.get('/stores', getAllStores);

router.get('/store/:id', getStoreById);

router.put('/store/:id', updateStore);

router.delete('/store/:id', deleteStore);

export default router;
