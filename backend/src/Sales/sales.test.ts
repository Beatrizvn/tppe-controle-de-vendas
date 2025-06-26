import request from 'supertest';
import express from 'express';
import router from './route'; 
import SaleRepository from './repository';

const app = express();
app.use(express.json());
app.use('/sales', router);

jest.mock('./repository', () => ({
  __esModule: true,
  default: {
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
  }
}));

describe('Sale Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('GET /sales deve retornar todas as vendas', async () => {
    const mockSales = [{ id: 1, total: 100 }];
    (SaleRepository.findAll as jest.Mock).mockResolvedValue(mockSales);

    const res = await request(app).get('/sales');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockSales);
  });

  it('GET /sales/:id deve retornar uma venda', async () => {
    const mockSale = { id: 1, total: 150 };
    (SaleRepository.findById as jest.Mock).mockResolvedValue(mockSale);

    const res = await request(app).get('/sales/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockSale);
  });

  it('GET /sales/:id deve retornar 404 se a venda não for encontrada', async () => {
    (SaleRepository.findById as jest.Mock).mockResolvedValue(undefined);

    const res = await request(app).get('/sales/999');
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: 'Sale not found' });
  });

  it('POST /sales deve criar uma nova venda', async () => {
    const newSale = { customerId: 1, total: 200 };
    const createdSale = { id: 3, ...newSale };
    (SaleRepository.create as jest.Mock).mockResolvedValue(createdSale);

    const res = await request(app).post('/sales').send(newSale);
    expect(res.status).toBe(201);
    expect(res.body).toEqual(createdSale);
  });

  it('POST /sales deve retornar 400 se dados inválidos', async () => {
    (SaleRepository.create as jest.Mock).mockRejectedValue(new Error('Invalid data'));

    const res = await request(app).post('/sales').send({});
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'Invalid data' });
  });

  it('DELETE /sales/:id deve remover uma venda', async () => {
    (SaleRepository.delete as jest.Mock).mockResolvedValue(undefined);

    const res = await request(app).delete('/sales/1');
    expect(res.status).toBe(204);
  });

  it('DELETE /sales/:id deve retornar 404 se não encontrar a venda', async () => {
    (SaleRepository.delete as jest.Mock).mockRejectedValue(new Error('Sale not found'));

    const res = await request(app).delete('/sales/999');
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: 'Sale not found' });
  });
});
