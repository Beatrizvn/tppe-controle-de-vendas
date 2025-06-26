import request from 'supertest';
import express from 'express';
import router from './route'; 
import { UserRepository } from './repository';

const app = express();
app.use(express.json());
app.use('/users', router);

jest.mock('./repository', () => ({
  UserRepository: {
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    countAll: jest.fn(),
  }
}));

describe('User Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('GET /users deve retornar todos os usuários', async () => {
    const mockUsers = [{ id: 1, name: 'Beatriz' }];
    (UserRepository.findAll as jest.Mock).mockResolvedValue(mockUsers);

    const res = await request(app).get('/users');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockUsers);
  });

  it('GET /users/:id deve retornar um usuário', async () => {
    const mockUser = { id: 1, name: 'Beatriz' };
    (UserRepository.findById as jest.Mock).mockResolvedValue(mockUser);

    const res = await request(app).get('/users/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockUser);
  });

  it('GET /users/:id deve retornar 404 se não encontrar o usuário', async () => {
    (UserRepository.findById as jest.Mock).mockResolvedValue(undefined);

    const res = await request(app).get('/users/999');
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: 'User not found' });
  });

  it('POST /users deve criar um novo usuário', async () => {
    const newUser = { name: 'Novo Usuário' };
    const createdUser = { id: 2, ...newUser };
    (UserRepository.create as jest.Mock).mockResolvedValue(createdUser);

    const res = await request(app).post('/users').send(newUser);
    expect(res.status).toBe(201);
    expect(res.body).toEqual(createdUser);
  });

  it('POST /users deve retornar 400 se dados inválidos', async () => {
    (UserRepository.create as jest.Mock).mockRejectedValue(new Error('Invalid data'));

    const res = await request(app).post('/users').send({});
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'Invalid data' });
  });

  it('PUT /users/:id deve atualizar um usuário', async () => {
    const updatedUser = { id: 1, name: 'Atualizado' };
    (UserRepository.update as jest.Mock).mockResolvedValue(updatedUser);

    const res = await request(app).put('/users/1').send({ name: 'Atualizado' });
    expect(res.status).toBe(200);
    expect(res.body).toEqual(updatedUser);
  });

  it('PUT /users/:id deve retornar 404 se erro', async () => {
    (UserRepository.update as jest.Mock).mockRejectedValue(new Error());

    const res = await request(app).put('/users/1').send({ name: 'Erro' });
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: 'User not found' });
  });

  it('DELETE /users/:id deve remover um usuário', async () => {
    (UserRepository.delete as jest.Mock).mockResolvedValue(undefined);

    const res = await request(app).delete('/users/1');
    expect(res.status).toBe(204);
  });

  it('DELETE /users/:id deve retornar 404 se não encontrar o usuário', async () => {
    (UserRepository.delete as jest.Mock).mockRejectedValue(new Error());

    const res = await request(app).delete('/users/999');
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: 'User not found' });
  });

  it('GET /users/count/all deve retornar a contagem de usuários', async () => {
    (UserRepository.countAll as jest.Mock).mockResolvedValue(10);

    const res = await request(app).get('/users/count/all');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ count: 10 });
  });
});
