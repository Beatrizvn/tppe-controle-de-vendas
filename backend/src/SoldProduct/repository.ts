import { Prisma, PrismaClient, SoldItem } from '@prisma/client';

const prisma = new PrismaClient();

export default class SoldItemRepository {
  static async findAll() {
    return prisma.soldItem.findMany({
      include: {
        product: true,
        sale: true
      }
    });
  }

  static async findById(id: number) {
    return prisma.soldItem.findUnique({
      where: { id },
      include: {
        product: true,
        sale: true
      }
    });
  }

  static async create(data: Prisma.SoldItemCreateInput) {
    return prisma.soldItem.create({
      data
    });
  }

  static async update(id: number, data: Partial<SoldItem>): Promise<SoldItem> {
    return prisma.soldItem.update({ where: { id }, data });
  }

  static async delete(id: number) {
    return prisma.soldItem.delete({
      where: { id }
    });
  }
}
