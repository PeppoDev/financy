import { prisma } from "../../prisma/prisma.js";
import type { UpsertCategory } from "../dtos/input/category.js";
import type { Category } from "../dtos/output/category.js";

export class CategoryService {
  async create(authorId: string, data: UpsertCategory): Promise<Category> {
    return prisma.category.create({ data: { ...data, authorId } });
  }

  async update(id: string, data: UpsertCategory): Promise<Category> {
    console.log(id);
    return prisma.category.update({ data, where: { id } });
  }

  async delete(id: string): Promise<Category> {
    return prisma.category.delete({
      where: {
        id,
      },
    });
  }

  async list(authorId: string): Promise<Category[]> {
    return prisma.category.findMany({
      where: {
        authorId,
      },
    });
  }

  async find(id: string): Promise<Category> {
    return prisma.category.findFirstOrThrow({
      where: {
        id,
      },
    });
  }
}
