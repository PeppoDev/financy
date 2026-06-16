import { prisma } from "../../prisma/prisma.js";
import type { UpsertTransaction } from "../dtos/input/transaction.js";
import type { Transaction } from "../dtos/output/transaction.js";

export class TransactionService {
  async create(
    authorId: string,
    data: UpsertTransaction,
  ): Promise<Transaction> {
    return prisma.transaction.create({ data: { ...data, authorId } });
  }

  async update(id: string, data: UpsertTransaction): Promise<Transaction> {
    console.log(id);
    return prisma.transaction.update({ data, where: { id } });
  }

  async delete(id: string): Promise<Transaction> {
    return prisma.transaction.delete({
      where: {
        id,
      },
    });
  }

  async list(authorId: string): Promise<Transaction[]> {
    return prisma.transaction.findMany({
      where: {
        authorId,
      },
    });
  }

  async find(id: string): Promise<Transaction> {
    return prisma.transaction.findFirstOrThrow({
      where: {
        id,
      },
    });
  }
}
