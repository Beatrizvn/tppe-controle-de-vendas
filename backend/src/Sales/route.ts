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

// GET /sales/user/:userId
router.get('/userid/:userId', async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);
  const sales = await SaleRepository.findByUserId(userId);
  res.json(sales);
});

// POST new sale
router.post('/', async (req: Request, res: Response) => {
  try {
    const newSale = await SaleRepository.create(req.body);
    res.status(201).json(newSale);
  } catch (err: unknown) {
    console.error(err);
    const errorMessage = err instanceof Error ? err.message : 'Invalid data';
    res.status(400).json({ error: errorMessage });
  }
});

// DELETE a sale
router.delete('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    await SaleRepository.delete(Number(id));
    res.sendStatus(204);
  } catch  {
    res.status(404).json({ error: 'Sale not found' });
  }
});

export default router;
