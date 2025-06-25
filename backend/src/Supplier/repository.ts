import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export class SupplierRepository {
  static async findAll() {
    return prisma.supplier.findMany();
  }

  static async findById(id: number) {
    return prisma.supplier.findUnique({ where: { id } });
  }

  static async findByCnpj(cnpj: string) {
    return prisma.supplier.findUnique({ where: { cnpj } });
  }

  static async create(data: Prisma.SupplierCreateInput) {
    return prisma.supplier.create({ data });
  }

  static async update(id: number, data: Prisma.SupplierUpdateInput) {
    return prisma.supplier.update({ where: { id }, data });
  }

  static async delete(id: number) {
    return prisma.supplier.delete({ where: { id } });
  }

  static async countAll() {
    return prisma.supplier.count();
  }
}
