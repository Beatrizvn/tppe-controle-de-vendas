import express from 'express';
import { Pool } from 'pg';
import cors from 'cors';
import customerRoutes from './Customer/route';
import usersRoutes from './User/route';
import productRoutes from './Product/route';
import supplierRoutes from './Supplier/route';
import paymentRoutes from './Payment/route';
import salesRoutes from './Sales/route'; 
import soldProductRoutes from './SoldProduct/route';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.use('/customers', customerRoutes);
app.use('/users', usersRoutes);
app.use('/products', productRoutes);
app.use('/suppliers', supplierRoutes);
app.use('/payments', paymentRoutes); 
app.use('/sales', salesRoutes);
app.use('/sold-products', soldProductRoutes);

export default app;

app.get('/', async (_, res) => {
  res.json({ message: 'Hello from backend!' });
});

app.listen(port, () => {
  console.log(`🚀 Backend running at http://localhost:${port}`);
});
