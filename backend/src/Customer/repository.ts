import { Customer, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class CustomerRepository {
  static async findAll(): Promise<Customer[]> {
    return prisma.customer.findMany();
  }

  static async findById(id: number): Promise<Customer | null> {
    return prisma.customer.findUnique({ where: { id } });
  }

  static async create(data: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>): Promise<Customer> {
    return prisma.customer.create({ data });
  }

  static async update(id: number, data: Partial<Customer>): Promise<Customer> {
    return prisma.customer.update({ where: { id }, data });
  }

  static async delete(id: number): Promise<void> {
    await prisma.customer.delete({ where: { id } });
  }

  static async countAll(): Promise<number> {
    return prisma.customer.count();
  }

  static async findByUserId(userId: number): Promise<Customer[]> {
    return prisma.customer.findMany({ where: { userId } });
  }
}
