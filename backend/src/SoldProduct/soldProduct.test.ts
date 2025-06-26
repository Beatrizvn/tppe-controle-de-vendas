import request from 'supertest';
import express from 'express';
import router from './route';
import SoldItemRepository from './repository';

const app = express();
app.use(express.json());
app.use('/sold-items', router);

jest.mock('./repository', () => ({
  __esModule: true,
  default: {
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
  }
}));

describe('SoldItem Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('GET /sold-items deve retornar todos os itens vendidos', async () => {
    const mockItems = [{ id: 1, productId: 10, quantity: 2 }];
    (SoldItemRepository.findAll as jest.Mock).mockResolvedValue(mockItems);

    const res = await request(app).get('/sold-items');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockItems);
  });

  it('GET /sold-items/:id deve retornar um item vendido', async () => {
    const mockItem = { id: 1, productId: 10, quantity: 2 };
    (SoldItemRepository.findById as jest.Mock).mockResolvedValue(mockItem);

    const res = await request(app).get('/sold-items/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockItem);
  });

  it('GET /sold-items/:id deve retornar 404 se item não encontrado', async () => {
    (SoldItemRepository.findById as jest.Mock).mockResolvedValue(undefined);

    const res = await request(app).get('/sold-items/999');
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: 'Sold item not found' });
  });

  it('POST /sold-items deve criar um novo item vendido', async () => {
    const newItem = { productId: 5, quantity: 3 };
    const createdItem = { id: 2, ...newItem };
    (SoldItemRepository.create as jest.Mock).mockResolvedValue(createdItem);

    const res = await request(app).post('/sold-items').send(newItem);
    expect(res.status).toBe(201);
    expect(res.body).toEqual(createdItem);
  });

  it('POST /sold-items deve retornar 400 se dados inválidos', async () => {
    (SoldItemRepository.create as jest.Mock).mockRejectedValue(new Error('Invalid data'));

    const res = await request(app).post('/sold-items').send({});
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'Invalid data' });
  });

  it('DELETE /sold-items/:id deve remover um item vendido', async () => {
    (SoldItemRepository.delete as jest.Mock).mockResolvedValue(undefined);

    const res = await request(app).delete('/sold-items/1');
    expect(res.status).toBe(204);
  });

  it('DELETE /sold-items/:id deve retornar 404 se item não encontrado', async () => {
    (SoldItemRepository.delete as jest.Mock).mockRejectedValue(new Error('Sold item not found'));

    const res = await request(app).delete('/sold-items/999');
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: 'Sold item not found' });
  });
});
