import request from 'supertest';
import express from 'express';
import router from './route'; 
import { SupplierRepository } from './repository';

const app = express();
app.use(express.json());
app.use('/suppliers', router);

jest.mock('./repository', () => ({
  SupplierRepository: {
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    countAll: jest.fn(),
  }
}));

describe('Supplier Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('GET /suppliers should return all suppliers', async () => {
    const mockSuppliers = [{ id: 1, name: 'Supplier 1' }];
    (SupplierRepository.findAll as jest.Mock).mockResolvedValue(mockSuppliers);

    const res = await request(app).get('/suppliers');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockSuppliers);
  });

  it('GET /suppliers/:id should return one supplier', async () => {
    const mockSupplier = { id: 1, name: 'Supplier 1' };
    (SupplierRepository.findById as jest.Mock).mockResolvedValue(mockSupplier);

    const res = await request(app).get('/suppliers/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockSupplier);
  });

  it('GET /suppliers/:id should return 404 if not found', async () => {
    (SupplierRepository.findById as jest.Mock).mockResolvedValue(undefined);

    const res = await request(app).get('/suppliers/999');
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: 'Supplier not found' });
  });

  it('POST /suppliers should create a supplier', async () => {
    const newSupplier = { name: 'New Supplier' };
    const createdSupplier = { id: 2, ...newSupplier };
    (SupplierRepository.create as jest.Mock).mockResolvedValue(createdSupplier);

    const res = await request(app).post('/suppliers').send(newSupplier);
    expect(res.status).toBe(201);
    expect(res.body).toEqual(createdSupplier);
  });

  it('POST /suppliers should return 400 on error', async () => {
    (SupplierRepository.create as jest.Mock).mockRejectedValue(new Error('Invalid data'));

    const res = await request(app).post('/suppliers').send({});
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'Invalid data' });
  });

  it('PUT /suppliers/:id should update a supplier', async () => {
    const updatedSupplier = { id: 1, name: 'Updated' };
    (SupplierRepository.update as jest.Mock).mockResolvedValue(updatedSupplier);

    const res = await request(app).put('/suppliers/1').send({ name: 'Updated' });
    expect(res.status).toBe(200);
    expect(res.body).toEqual(updatedSupplier);
  });

  it('PUT /suppliers/:id should return 404 on error', async () => {
    (SupplierRepository.update as jest.Mock).mockRejectedValue(new Error());

    const res = await request(app).put('/suppliers/999').send({ name: 'Updated' });
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: 'Supplier not found' });
  });

  it('DELETE /suppliers/:id should delete a supplier', async () => {
    (SupplierRepository.delete as jest.Mock).mockResolvedValue(undefined);

    const res = await request(app).delete('/suppliers/1');
    expect(res.status).toBe(204);
  });

  it('DELETE /suppliers/:id should return 404 on error', async () => {
    (SupplierRepository.delete as jest.Mock).mockRejectedValue(new Error());

    const res = await request(app).delete('/suppliers/999');
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: 'Supplier not found' });
  });

  it('GET /suppliers/count/all should return count', async () => {
    (SupplierRepository.countAll as jest.Mock).mockResolvedValue(5);

    const res = await request(app).get('/suppliers/count/all');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ count: 5 });
  });
});
