// routes/manufacturerRoutes.js
import express from 'express';
import {
  createManufacturer,
  getAllManufacturers,
  getManufacturerById,
  updateManufacturer,
  deleteManufacturer,
} from '../controllers/manufacturerController.js';

const router = express.Router();

router.post('/manufacturer', createManufacturer);
router.get('/manufacturers', getAllManufacturers);
router.get('/manufacturer/:id', getManufacturerById);
router.put('/manufacturer/:id', updateManufacturer);
router.delete('/manufacturer/:id', deleteManufacturer);

export default router;
