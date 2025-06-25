import { PrismaClient, Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export class UserRepository {
  static async findAll() {
    return prisma.user.findMany();
  }

  static async findById(id: number) {
    return prisma.user.findUnique({ where: { id } });
  }

  static async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  static async create(data: Prisma.UserCreateInput) {
    const hashedPassword = await bcrypt.hash(data.password, 10); // 10 = salt rounds
    return prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
  }

  static async update(id: number, data: Prisma.UserUpdateInput) {
    return prisma.user.update({ where: { id }, data });
  }

  static async delete(id: number) {
    return prisma.user.delete({ where: { id } });
  }

  static async countAll() {
    return prisma.user.count();
  }
}
