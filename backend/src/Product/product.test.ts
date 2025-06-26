import request from 'supertest';
import express from 'express';
import router from './route'; 
import { ProductRepository } from './repository';

const app = express();
app.use(express.json());
app.use('/products', router);

jest.mock('./repository', () => ({
  ProductRepository: {
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    countAll: jest.fn(),
  }
}));

describe('Product Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('GET /products retorna todos os produtos', async () => {
    const mockProducts = [{ id: 1, name: 'Produto 1' }];
    (ProductRepository.findAll as jest.Mock).mockResolvedValue(mockProducts);

    const res = await request(app).get('/products');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockProducts);
  });

  it('GET /products/:id retorna um produto', async () => {
    const mockProduct = { id: 1, name: 'Produto 1' };
    (ProductRepository.findById as jest.Mock).mockResolvedValue(mockProduct);

    const res = await request(app).get('/products/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockProduct);
  });

  it('GET /products/:id retorna 404 se não achar o produto', async () => {
    (ProductRepository.findById as jest.Mock).mockResolvedValue(undefined);

    const res = await request(app).get('/products/999');
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: 'Product not found' });
  });

  it('POST /products cria um novo produto', async () => {
    const newProduct = { name: 'Novo Produto' };
    const createdProduct = { id: 2, ...newProduct };
    (ProductRepository.create as jest.Mock).mockResolvedValue(createdProduct);

    const res = await request(app).post('/products').send(newProduct);
    expect(res.status).toBe(201);
    expect(res.body).toEqual(createdProduct);
  });

  it('POST /products retorna 400 se dados inválidos', async () => {
    (ProductRepository.create as jest.Mock).mockRejectedValue(new Error('Invalid data'));

    const res = await request(app).post('/products').send({});
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'Invalid data' });
  });

  it('PUT /products/:id atualiza um produto', async () => {
    const updatedProduct = { id: 1, name: 'Produto Atualizado' };
    (ProductRepository.update as jest.Mock).mockResolvedValue(updatedProduct);

    const res = await request(app).put('/products/1').send({ name: 'Produto Atualizado' });
    expect(res.status).toBe(200);
    expect(res.body).toEqual(updatedProduct);
  });

  it('PUT /products/:id retorna 404 se erro', async () => {
    (ProductRepository.update as jest.Mock).mockRejectedValue(new Error());

    const res = await request(app).put('/products/1').send({ name: 'Erro' });
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: 'Product not found' });
  });

  it('DELETE /products/:id remove um produto', async () => {
    (ProductRepository.delete as jest.Mock).mockResolvedValue(undefined);

    const res = await request(app).delete('/products/1');
    expect(res.status).toBe(204);
  });

  it('DELETE /products/:id retorna 404 se não encontrar produto', async () => {
    (ProductRepository.delete as jest.Mock).mockRejectedValue(new Error());

    const res = await request(app).delete('/products/999');
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: 'Product not found' });
  });

  it('GET /products/count/all retorna o total de produtos', async () => {
    (ProductRepository.countAll as jest.Mock).mockResolvedValue(15);

    const res = await request(app).get('/products/count/all');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ count: 15 });
  });
});
