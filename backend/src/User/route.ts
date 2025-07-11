import express, { Request, Response } from 'express';
import { UserRepository } from './repository';

const router = express.Router();

// GET /users
router.get('/', async (_req: Request, res: Response) => {
  const users = await UserRepository.findAll();
  res.json(users);
});

// GET /users/:id
router.get('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const user = await UserRepository.findById(id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

// POST /users
router.post('/', async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const newUser = await UserRepository.create(data);
    res.status(201).json(newUser);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Invalid data';
    res.status(400).json({ error: errorMessage });
  }
});

// PUT /users/:id
router.put('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const updated = await UserRepository.update(id, req.body);
    res.json(updated);
  } catch {
    res.status(404).json({ message: 'User not found' });
  }
});

// DELETE /users/:id
router.delete('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    await UserRepository.delete(id);
    res.status(204).send();
  } catch {
    res.status(404).json({ message: 'User not found' });
  }
});

// GET /users/count
router.get('/count/all', async (_req: Request, res: Response) => {
  const count = await UserRepository.countAll();
  res.json({ count });
});

export default router;
