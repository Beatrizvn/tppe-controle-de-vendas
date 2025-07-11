import express, { Request, Response } from 'express';
import { SupplierRepository } from './repository';

const router = express.Router();

// GET /suppliers
router.get('/', async (_req: Request, res: Response) => {
  const suppliers = await SupplierRepository.findAll();
  res.json(suppliers);
});

// GET /suppliers/:id
router.get('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const supplier = await SupplierRepository.findById(id);
  if (!supplier) return res.status(404).json({ message: 'Supplier not found' });
  res.json(supplier);
});

// POST /suppliers
router.post('/', async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const newSupplier = await SupplierRepository.create(data);
    res.status(201).json(newSupplier);
  } catch (err: unknown) {
    console.error(err);
    const errorMessage = (err instanceof Error) ? err.message : 'Invalid data';
    res.status(400).json({ error: errorMessage });
  }
});

// PUT /suppliers/:id
router.put('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const updated = await SupplierRepository.update(id, req.body);
    res.json(updated);
  } catch {
    res.status(404).json({ message: 'Supplier not found' });
  }
});

// DELETE /suppliers/:id
router.delete('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    await SupplierRepository.delete(id);
    res.status(204).send();
  } catch {
    res.status(404).json({ message: 'Supplier not found' });
  }
});

// GET /suppliers/count/all
router.get('/count/all', async (_req: Request, res: Response) => {
  const count = await SupplierRepository.countAll();
  res.json({ count });
});

export default router;
