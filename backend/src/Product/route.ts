import express, { Request, Response } from 'express';
import { ProductRepository } from './repository';

const router = express.Router();

// GET /products
router.get('/', async (_req: Request, res: Response) => {
  const products = await ProductRepository.findAll();
  res.json(products);
});

// GET /products/:id
router.get('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const product = await ProductRepository.findById(id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

// POST /products
router.post('/', async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const newProduct = await ProductRepository.create(data);
    res.status(201).json(newProduct);
  } catch (err: any) {
    console.error(err);
    res.status(400).json({ error: err.message || 'Invalid data' });
  }
});

// PUT /products/:id
router.put('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const updated = await ProductRepository.update(id, req.body);
    res.json(updated);
  } catch {
    res.status(404).json({ message: 'Product not found' });
  }
});

// DELETE /products/:id
router.delete('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    await ProductRepository.delete(id);
    res.status(204).send();
  } catch {
    res.status(404).json({ message: 'Product not found' });
  }
});

// GET /products/count/all
router.get('/count/all', async (_req: Request, res: Response) => {
  const count = await ProductRepository.countAll();
  res.json({ count });
});

export default router;
