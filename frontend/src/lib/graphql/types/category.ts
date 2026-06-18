import { type CategoryFormValues } from "@/pages/categories/category-form";

export type ListCategoriesQueryData = {
  listCategories: Array<{
    id: string;
    title: string;
    description?: string | null;
  }>;
};

export type CreateCategoryMutationData = {
  createCategory: {
    id: string;
    title: string;
    color: string;
    icon: string;
    description?: string | null;
  };
};

export type CreateCategoryMutationVariables = {
  data: {
    title: string;
    color: string;
    icon: string;
    description?: string;
  };
};

export type CreateCategoryOnSubmitParam = CategoryFormValues;

export type CreateCategoryOnSubmitReturn = Promise<void>;
