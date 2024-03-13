import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'; // Import cors middleware

mongoose.set('strictQuery', false);
dotenv.config();

import manufacturerRoutes from './routes/manufacturerRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import storeRoutes from './routes/storeRoutes.js';

const app = express();
const PORT = process.env.PORT || 4000;
const CONNECTION = process.env.DBCONNECTION || '';

app.use(express.json());
app.use(cors());

// Routes
app.use('/api', manufacturerRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', storeRoutes);

const start = async () => {
  try {
    await mongoose.connect(CONNECTION);

    console.log('Pinged your deployment. You successfully connected to MongoDB!');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (e) {
    console.log(e.message);
  }
};

start();
