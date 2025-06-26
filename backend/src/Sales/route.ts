import express, { Request, Response } from 'express';
import SaleRepository from './repository';

const router = express.Router();

// GET all sales
router.get('/', async (_, res: Response) => {
  const sales = await SaleRepository.findAll();
  res.json(sales);
});

// GET one sale
router.get('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const sale = await SaleRepository.findById(id);
  if (!sale) return res.status(404).json({ message: 'Sale not found' });
  res.json(sale);
});

// POST new sale
router.post('/', async (req: Request, res: Response) => {
  try {
    const newSale = await SaleRepository.create(req.body);
    res.status(201).json(newSale);
  } catch (err: any) {
    console.error(err);
    res.status(400).json({ error: err.message || 'Invalid data' });
  }
});

// DELETE a sale
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await SaleRepository.delete(Number(req.params.id));
    res.sendStatus(204);
  } catch (err: any) {
    console.error(err);
    res.status(404).json({ error: 'Sale not found' });
  }
});

export default router;
