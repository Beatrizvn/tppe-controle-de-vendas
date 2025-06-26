import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default class SaleRepository {
  static async findAll() {
    return prisma.sale.findMany({
      include: {
        customer: true,
        user: true,
        soldItems: {
          include: { product: true }
        },
        payment: true
      }
    });
  }

  static async findById(id: number) {
    return prisma.sale.findUnique({
      where: { id },
      include: {
        customer: true,
        user: true,
        soldItems: {
          include: { product: true }
        },
        payment: true
      }
    });
  }

  static async create(data: Prisma.SaleCreateInput) {
    return prisma.sale.create({
      data,
      include: {
        soldItems: true,
        payment: true
      }
    });
  }

  static async delete(id: number) {
    return prisma.sale.delete({
      where: { id }
    });
  }
}
