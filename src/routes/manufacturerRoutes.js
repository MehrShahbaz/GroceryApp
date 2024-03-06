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

router.post('/manufacturers', createManufacturer);
router.get('/manufacturers', getAllManufacturers);
router.get('/manufacturers/:id', getManufacturerById);
router.put('/manufacturers/:id', updateManufacturer);
router.delete('/manufacturers/:id', deleteManufacturer);

export default router;
