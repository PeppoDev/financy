import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";

import { UpsertTransaction } from "../dtos/input/transaction.js";
import { Category } from "../dtos/output/category.js";
import { Transaction } from "../dtos/output/transaction.js";
import { User } from "../dtos/output/user.js";
import { GqlUser } from "../graphql/decorator/user.decorator.js";
import { IsAuth } from "../middleware/auth.middleware.js";
import { CategoryService } from "../services/category.service.js";
import { TransactionService } from "../services/transaction.service.js";
import { UserService } from "../services/user.service.js";

@UseMiddleware(IsAuth)
@Resolver(Transaction)
export class TransactionResolver {
  constructor(
    private transactionService: TransactionService,
    private userService: UserService,
    private categoryService: CategoryService,
  ) {
    this.transactionService = new TransactionService();
    this.userService = new UserService();
    this.categoryService = new CategoryService();
  }

  @Mutation(() => Transaction)
  async createTransaction(
    @Arg("data", () => UpsertTransaction) data: UpsertTransaction,
    @GqlUser() user: User,
  ): Promise<Transaction> {
    return this.transactionService.create(user.id, data);
  }

  @Mutation(() => Transaction)
  async updateTransaction(
    @Arg("data", () => UpsertTransaction) data: UpsertTransaction,
    @Arg("id", () => String) id: string,
  ): Promise<Transaction> {
    return this.transactionService.update(id, data);
  }

  @Mutation(() => Transaction)
  async deleteTransaction(
    @Arg("id", () => String) id: string,
  ): Promise<Transaction> {
    return this.transactionService.delete(id);
  }

  @Query(() => [Transaction])
  async listTransactions(@GqlUser() user: User): Promise<Transaction[]> {
    return this.transactionService.list(user.id);
  }

  @Query(() => Transaction)
  async getTransaction(
    @Arg("id", () => String) id: string,
  ): Promise<Transaction> {
    return this.transactionService.find(id);
  }

  @FieldResolver(() => User)
  async author(@Root() transaction: Transaction): Promise<User> {
    return this.userService.find(transaction.authorId);
  }

  @FieldResolver(() => Category)
  async category(@Root() transaction: Transaction): Promise<Category> {
    return this.categoryService.find(transaction.categoryId);
  }
}
