import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pg from 'pg';
import config from '../config.js';

const client = new pg.Client(config);

const connect = async () =>  {
  try {
    await client.connect();
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database', error);
  }
}

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

connect();

app.all('*', (_req, res) => {
  res.send('Route Does not exist');
});

app.listen(port, () => {
  console.log(`Server is Runnig on Port: ${port}`);
});
