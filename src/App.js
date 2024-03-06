import express from 'express';
import config from './config/config.js';
import manufacturerRoutes from './routes/manufacturerRoutes.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// Routes
app.use('/api', manufacturerRoutes);

config.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
