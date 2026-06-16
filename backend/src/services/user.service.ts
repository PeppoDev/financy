import { prisma } from "../../prisma/prisma.js";
import type { CreateUser, UpdateUser } from "../dtos/input/user.js";
import { ConflictException } from "../exceptions/graphql.exception.js";
import { CryptHelper } from "../helper/crypt.helper.js";

export class UserService {
  async find(id: string) {
    const user = await prisma.user.findUniqueOrThrow({
      where: { id },
    });

    return user;
  }

  async update(id: string, data: UpdateUser) {
    const user = await prisma.user.update({
      where: { id },
      data,
    });

    return user;
  }

  async create(data: CreateUser) {
    const findUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (findUser) throw new ConflictException("User already registered!");

    return prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: await CryptHelper.hash(data.password),
      },
    });
  }
}
