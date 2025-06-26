import request from 'supertest';
import express from 'express';
import router from './route';
import { CustomerRepository } from './repository';

// Monta o app Express
const app = express();
app.use(express.json());
app.use('/customers', router);

// Mock do repositório
jest.mock('./repository', () => ({
  CustomerRepository: {
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    countAll: jest.fn(),
  }
}));

describe('Customer Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('GET /customers deve retornar todos os clientes', async () => {
    const mockCustomers = [{ id: 1, name: 'Beatriz' }];
    (CustomerRepository.findAll as jest.Mock).mockResolvedValue(mockCustomers);

    const res = await request(app).get('/customers');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockCustomers);
  });

  it('GET /customers/:id deve retornar um cliente', async () => {
    const mockCustomer = { id: 1, name: 'Beatriz' };
    (CustomerRepository.findById as jest.Mock).mockResolvedValue(mockCustomer);

    const res = await request(app).get('/customers/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockCustomer);
  });

  it('GET /customers/:id deve retornar 404 se cliente não existir', async () => {
    (CustomerRepository.findById as jest.Mock).mockResolvedValue(undefined);

    const res = await request(app).get('/customers/999');
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: 'Customer not found' });
  });

  it('POST /customers deve criar um cliente', async () => {
    const newCustomer = { name: 'Novo Cliente' };
    const createdCustomer = { id: 2, ...newCustomer };
    (CustomerRepository.create as jest.Mock).mockResolvedValue(createdCustomer);

    const res = await request(app).post('/customers').send(newCustomer);
    expect(res.status).toBe(201);
    expect(res.body).toEqual(createdCustomer);
  });

  it('POST /customers deve retornar 400 se dados forem inválidos', async () => {
    (CustomerRepository.create as jest.Mock).mockRejectedValue(new Error());

    const res = await request(app).post('/customers').send({});
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'Invalid data' });
  });

  it('PUT /customers/:id deve atualizar um cliente', async () => {
    const updatedCustomer = { id: 1, name: 'Atualizado' };
    (CustomerRepository.update as jest.Mock).mockResolvedValue(updatedCustomer);

    const res = await request(app).put('/customers/1').send({ name: 'Atualizado' });
    expect(res.status).toBe(200);
    expect(res.body).toEqual(updatedCustomer);
  });

  it('PUT /customers/:id deve retornar 404 em erro', async () => {
    (CustomerRepository.update as jest.Mock).mockRejectedValue(new Error());

    const res = await request(app).put('/customers/1').send({ name: 'Erro' });
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: 'Customer not found' });
  });

  it('DELETE /customers/:id deve remover um cliente', async () => {
    (CustomerRepository.delete as jest.Mock).mockResolvedValue(undefined);

    const res = await request(app).delete('/customers/1');
    expect(res.status).toBe(204);
  });

  it('DELETE /customers/:id deve retornar 404 se não existir', async () => {
    (CustomerRepository.delete as jest.Mock).mockRejectedValue(new Error());

    const res = await request(app).delete('/customers/999');
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: 'Customer not found' });
  });

  it('GET /customers/count/all deve retornar o total de clientes', async () => {
    (CustomerRepository.countAll as jest.Mock).mockResolvedValue(42);

    const res = await request(app).get('/customers/count/all');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ count: 42 });
  });
});
