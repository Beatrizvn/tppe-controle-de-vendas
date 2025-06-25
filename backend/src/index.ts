import express from 'express';
import { Pool } from 'pg';
import cors from 'cors';
import customerRoutes from './Customer/route';
import usersRoutes from './User/route';
import productRoutes from './Product/route';
import supplierRoutes from './Supplier/route';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.use('/customers', customerRoutes);
app.use('/users', usersRoutes);
app.use('/products', productRoutes);
app.use('/suppliers', supplierRoutes);

app.get('/', async (_, res) => {
  res.json({ message: 'Hello from backend!' });
});

app.listen(port, () => {
  console.log(`🚀 Backend running at http://localhost:${port}`);
});
