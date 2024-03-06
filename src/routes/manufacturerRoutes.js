import express from 'express';

import { createManufacturer } from '../controllers/manufacturerController.js';

const router = express.Router();

router.post('/manufacturer', createManufacturer);

export default router;
