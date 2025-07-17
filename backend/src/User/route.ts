import express, { Request, Response } from 'express';
import { UserRepository } from './repository';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await UserRepository.findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Email' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Senha inválidos' });
    }

    const secret = process.env.JWT_SECRET || 'seu_segredo_super_secreto';
    const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '1h' });

    res.status(200).json({
      user: { id: user.id, name: user.name, email: user.email },
      token,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
});

// POST /logout
router.post('/logout', (_req: Request, res: Response) => {
  try {
    res.clearCookie('auth_token', { path: '/' });
    
    res.status(200).json({ message: 'Logout realizado com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// PUT /users/:id
router.put('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const data = req.body;
  try {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    const updated = await UserRepository.update(id, data);
    res.json(updated);
  } catch (error) { 
    console.error(error);
    res.status(404).json({ message: 'User not found' });
  }
});


export default router;
