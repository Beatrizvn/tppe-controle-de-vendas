import request from 'supertest';
import express from 'express';
import router from './route'; 
import PaymentRepository from './repository';

const app = express();
app.use(express.json());
app.use('/payments', router);

jest.mock('./repository', () => ({
  __esModule: true,
  default: {
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  }
}));

describe('Payment Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('GET /payments deve retornar todos os pagamentos', async () => {
    const mockPayments = [{ id: 1, method: 'PIX', amount: 100 }];
    (PaymentRepository.findAll as jest.Mock).mockResolvedValue(mockPayments);

    const res = await request(app).get('/payments');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockPayments);
  });

  it('GET /payments/:id deve retornar um pagamento', async () => {
    const mockPayment = { id: 1, method: 'PIX', amount: 100 };
    (PaymentRepository.findById as jest.Mock).mockResolvedValue(mockPayment);

    const res = await request(app).get('/payments/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockPayment);
  });

  it('GET /payments/:id deve retornar 404 se não encontrado', async () => {
    (PaymentRepository.findById as jest.Mock).mockResolvedValue(undefined);

    const res = await request(app).get('/payments/999');
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: 'Payment not found' });
  });

  it('POST /payments deve criar um novo pagamento', async () => {
    const newPayment = { method: 'PIX', amount: 250 };
    const createdPayment = { id: 2, ...newPayment };
    (PaymentRepository.create as jest.Mock).mockResolvedValue(createdPayment);

    const res = await request(app).post('/payments').send(newPayment);
    expect(res.status).toBe(201);
    expect(res.body).toEqual(createdPayment);
  });

  it('POST /payments deve retornar 400 se erro', async () => {
    (PaymentRepository.create as jest.Mock).mockRejectedValue(new Error('Invalid data'));

    const res = await request(app).post('/payments').send({});
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'Invalid data' });
  });

  it('PUT /payments/:id deve atualizar um pagamento', async () => {
    const updatedPayment = { id: 1, method: 'Cartão', amount: 300 };
    (PaymentRepository.update as jest.Mock).mockResolvedValue(updatedPayment);

    const res = await request(app).put('/payments/1').send({ method: 'Cartão', amount: 300 });
    expect(res.status).toBe(200);
    expect(res.body).toEqual(updatedPayment);
  });

  it('PUT /payments/:id deve retornar 400 se erro ao atualizar', async () => {
    (PaymentRepository.update as jest.Mock).mockRejectedValue(new Error('Erro de atualização'));

    const res = await request(app).put('/payments/1').send({ method: 'Erro' });
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'Erro de atualização' });
  });

  it('DELETE /payments/:id deve remover um pagamento', async () => {
    (PaymentRepository.delete as jest.Mock).mockResolvedValue(undefined);

    const res = await request(app).delete('/payments/1');
    expect(res.status).toBe(204);
  });

  it('DELETE /payments/:id deve retornar 404 se pagamento não encontrado', async () => {
    (PaymentRepository.delete as jest.Mock).mockRejectedValue(new Error('Payment not found'));

    const res = await request(app).delete('/payments/999');
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: 'Payment not found' });
  });
});
