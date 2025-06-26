import express, { Request, Response } from 'express';
import PaymentRepository from './repository';

const router = express.Router();

// GET all payments
router.get('/', async (_, res: Response) => {
  const payments = await PaymentRepository.findAll();
  res.json(payments);
});

// GET a payment by ID
router.get('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const payment = await PaymentRepository.findById(id);
  if (!payment) return res.status(404).json({ message: 'Payment not found' });
  res.json(payment);
});

// POST new payment
router.post('/', async (req: Request, res: Response) => {
  try {
    const newPayment = await PaymentRepository.create(req.body);
    res.status(201).json(newPayment);
  } catch (err: any) {
    console.error(err);
    res.status(400).json({ error: err.message || 'Invalid data' });
  }
});

// PUT update payment
router.put('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const updated = await PaymentRepository.update(id, req.body);
    res.json(updated);
  } catch (err: any) {
    console.error(err);
    res.status(400).json({ error: err.message || 'Could not update payment' });
  }
});

// DELETE payment
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await PaymentRepository.delete(Number(req.params.id));
    res.sendStatus(204);
  } catch (err: any) {
    console.error(err);
    res.status(404).json({ error: 'Payment not found' });
  }
});

export default router;
