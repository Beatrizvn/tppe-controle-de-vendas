import express, { Request, Response } from 'express';
import SaleRepository from './repository';
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

// PUT /sales/:id
router.put('/:id', async (req: Request, res: Response) => {
  const saleId = Number(req.params.id);

  if (isNaN(saleId)) {
    return res.status(400).json({ message: 'O ID da venda é inválido.' });
  }

  const { soldItems, payment, ...saleData } = req.body;

  if (!soldItems || !Array.isArray(soldItems) || soldItems.length === 0) {
    return res.status(400).json({
      message: 'O campo "soldItems" é obrigatório e deve ser um array com pelo menos um item.',
    });
  }

  try {
    const updatedSale = await prisma.$transaction(async (tx) => {
      await tx.sale.update({
        where: { id: saleId },
        data: {
          ...saleData,
          payment: payment ? {
            upsert: {
              where: { saleId: saleId },
              create: { ...payment },
              update: { ...payment },
            },
          } : undefined,
        },
      });

      await tx.soldItem.deleteMany({
        where: { saleId: saleId },
      });

      await tx.soldItem.createMany({
        data: soldItems.map((item: { productId: number; quantity: number; unitPrice: number; }) => ({
          ...item,
          saleId: saleId,
        })),
      });
      
      const saleWithAllData = await tx.sale.findUniqueOrThrow({
        where: { id: saleId },
        include: {
          soldItems: {
            include: {
              product: true, 
            },
          },
          payment: true,
          customer: true,
        },
      });

      return saleWithAllData; 
    });

    res.json(updatedSale);

  } catch (error) {
    console.error("Falha ao atualizar a venda:", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        return res.status(404).json({ message: 'Venda não encontrada.' });
    }
    res.status(500).json({ message: 'Não foi possível atualizar a venda.' });
  }
});

// DELETE a sale
router.delete('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    await SaleRepository.delete(Number(id));
    res.sendStatus(204);
  } catch {
    res.status(404).json({ error: 'Sale not found' });
  }
});

export default router;
