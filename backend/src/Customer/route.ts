import express, { Request, Response } from 'express';
import { CustomerRepository } from './repository';

const router = express.Router();

// GET /customers
router.get('/', async (_req: Request, res: Response) => {
  const customers = await CustomerRepository.findAll();
  res.json(customers);
});

// GET /customers/:id
router.get('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const customer = await CustomerRepository.findById(id);
  if (!customer) return res.status(404).json({ message: 'Customer not found' });
  res.json(customer);
});

// POST /customers
router.post('/', async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const newCustomer = await CustomerRepository.create(data);
    res.status(201).json(newCustomer);
  } catch {
    res.status(400).json({ error: 'Invalid data' });
  }
});

// PUT /customers/:id
router.put('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const data = req.body;
  try {
    const updated = await CustomerRepository.update(id, data);
    res.json(updated);
  } catch {
    res.status(404).json({ message: 'Customer not found' });
  }
});

// DELETE /customers/:id
router.delete('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    await CustomerRepository.delete(id);
    res.status(204).send();
  } catch {
    res.status(404).json({ message: 'Customer not found' });
  }
});

// GET /customers/count
router.get('/count/all', async (_req: Request, res: Response) => {
  const count = await CustomerRepository.countAll();
  res.json({ count });
});

// GET /customers/user/:userId
router.get('/userid/:userId', async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);
  const customers = await CustomerRepository.findByUserId(userId);
  res.json(customers);
});

export default router;
