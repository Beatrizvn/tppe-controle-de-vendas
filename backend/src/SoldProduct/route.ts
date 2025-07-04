import express, { Request, Response } from 'express';
import SoldItemRepository from './repository';

const router = express.Router();

// GET all sold items
router.get('/', async (_, res: Response) => {
  const soldItems = await SoldItemRepository.findAll();
  res.json(soldItems);
});

// GET a sold item by ID
router.get('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const item = await SoldItemRepository.findById(id);
  if (!item) return res.status(404).json({ message: 'Sold item not found' });
  res.json(item);
});

// POST new sold item
router.post('/', async (req: Request, res: Response) => {
  try {
    const newItem = await SoldItemRepository.create(req.body);
    res.status(201).json(newItem);
  } catch (err: any) {
    console.error(err);
    res.status(400).json({ error: err.message || 'Invalid data' });
  }
});

// DELETE a sold item
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await SoldItemRepository.delete(Number(req.params.id));
    res.sendStatus(204);
  } catch (err: any) {
    console.error(err);
    res.status(404).json({ error: 'Sold item not found' });
  }
});

export default router;
