import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export class ProductRepository {
  static async findAll() {
    return prisma.product.findMany();
  }

  static async findById(id: number) {
    return prisma.product.findUnique({ where: { id } });
  }

  static async findByCode(code: string) {
    return prisma.product.findUnique({ where: { code } });
  }

  static async create(data: Prisma.ProductCreateInput) {
    return prisma.product.create({ data });
  }

  static async update(id: number, data: Prisma.ProductUpdateInput) {
    return prisma.product.update({ where: { id }, data });
  }

  static async delete(id: number) {
    return prisma.product.delete({ where: { id } });
  }

  static async countAll() {
    return prisma.product.count();
  }
}
