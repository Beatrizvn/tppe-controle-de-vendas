import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default class PaymentRepository {
  static async findAll() {
    return prisma.payment.findMany({
      include: {
        sale: true
      }
    });
  }

  static async findById(id: number) {
    return prisma.payment.findUnique({
      where: { id },
      include: {
        sale: true
      }
    });
  }

  static async create(data: Prisma.PaymentCreateInput) {
    return prisma.payment.create({
      data
    });
  }

  static async update(id: number, data: Prisma.PaymentUpdateInput) {
    return prisma.payment.update({
      where: { id },
      data
    });
  }

  static async delete(id: number) {
    return prisma.payment.delete({
      where: { id }
    });
  }
}
