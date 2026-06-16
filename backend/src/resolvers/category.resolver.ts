import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";

import { UpsertCategory } from "../dtos/input/category.js";
import { Category } from "../dtos/output/category.js";
import type { User } from "../dtos/output/user.js";
import { GqlUser } from "../graphql/decorator/user.decorator.js";
import { IsAuth } from "../middleware/auth.middleware.js";
import { CategoryService } from "../services/category.service.js";
import { UserService } from "../services/user.service.js";

@UseMiddleware(IsAuth)
@Resolver(Category)
export class CategoryResolver {
  constructor(
    private categoryService: CategoryService,
    private userService: UserService,
  ) {
    this.categoryService = new CategoryService();
    this.userService = new UserService();
  }

  @Mutation(() => Category)
  async createCategory(
    @Arg("data", () => UpsertCategory) data: UpsertCategory,
    @GqlUser() user: User,
  ): Promise<Category> {
    return this.categoryService.create(user.id, data);
  }

  @Mutation(() => Category)
  async updateCategory(
    @Arg("data", () => UpsertCategory) data: UpsertCategory,
    @Arg("id", () => String) id: string,
  ): Promise<Category> {
    return this.categoryService.update(id, data);
  }

  @Mutation(() => Category)
  async deleteCategory(@Arg("id", () => String) id: string): Promise<Category> {
    return this.categoryService.delete(id);
  }

  @Query(() => [Category])
  async listCategories(@GqlUser() user: User): Promise<Category[]> {
    return this.categoryService.list(user.id);
  }

  @Query(() => Category)
  async getIdea(@Arg("id", () => String) id: string): Promise<Category> {
    return this.categoryService.findById(id);
  }

  @FieldResolver(() => Category)
  async author(@Root() category: Category): Promise<User> {
    return this.userService.find(category.authorId);
  }
}
