import express from 'express';
import { Pool } from 'pg';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'tppe',
  password: 'postgres',
  port: 5432,
});

app.get('/', async (_, res) => {
  res.json({ message: 'Hello from backend!' });
});

app.listen(port, () => {
  console.log(`🚀 Backend running at http://localhost:${port}`);
});
