import express from 'express';
import config from './config/config.js';

import manufacturerRoutes from './routes/manufacturerRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// Routes
app.use('/api', manufacturerRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);

config.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
