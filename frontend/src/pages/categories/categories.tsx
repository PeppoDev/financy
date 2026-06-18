import { useMemo, useState } from "react";
import { useApolloClient, useMutation, useQuery } from "@apollo/client/react";
import { Plus, SquarePen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DELETE_CATEGORY } from "@/lib/graphql/mutations/category";
import { GET_CATEGORIES } from "@/lib/graphql/queries/category";
import { GET_TRANSACTIONS } from "@/lib/graphql/queries/transaction";
import {
  type DeleteCategoryMutationData,
  type DeleteCategoryMutationVariables,
  type ListCategoriesQueryData,
} from "@/lib/graphql/types/category";
import { type ListTransactionsQueryData } from "@/lib/graphql/types/transaction";
import { toast } from "sonner";
import { NewCategoryModal } from "./components/new-category-modal";
import { CategoriesStats } from "./components/categories-stats";
import { CategoryCard } from "./components/category-card";

type CategoryCardData = {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
};

function normalizeCategoryTitle(value: string) {
  return value.trim().toLowerCase();
}

export function Categories() {
  const [deletingCategoryId, setDeletingCategoryId] = useState<string | null>(
    null,
  );

  const apolloClient = useApolloClient();

  const {
    data: categoriesData,
    loading,
    error,
  } = useQuery<ListCategoriesQueryData>(GET_CATEGORIES);
  const { data: transactionsData } =
    useQuery<ListTransactionsQueryData>(GET_TRANSACTIONS);
  const [deleteCategory] = useMutation<
    DeleteCategoryMutationData,
    DeleteCategoryMutationVariables
  >(DELETE_CATEGORY);

  const categories = useMemo<CategoryCardData[]>(() => {
    if (!categoriesData?.listCategories) {
      return [];
    }

    return categoriesData.listCategories.map((category) => ({
      id: category.id,
      title: category.title,
      description: category.description?.trim() ?? "",
      icon: category.icon,
      color: category.color,
    }));
  }, [categoriesData]);

  const categoryItemsByTitle = useMemo(() => {
    const itemsByTitle = new Map<string, number>();

    for (const transaction of transactionsData?.listTransactions ?? []) {
      const categoryTitle = transaction.category?.title;

      if (!categoryTitle) {
        continue;
      }

      const key = normalizeCategoryTitle(categoryTitle);
      const currentCount = itemsByTitle.get(key) ?? 0;

      itemsByTitle.set(key, currentCount + 1);
    }

    return itemsByTitle;
  }, [transactionsData]);

  const totalTransactions = transactionsData?.listTransactions.length ?? 0;

  const mostUsedCategory = useMemo<string | null>(() => {
    let currentMostUsedTitle: string | null = null;
    let currentMostUsedCount = 0;

    for (const category of categories) {
      const categoryCount =
        categoryItemsByTitle.get(normalizeCategoryTitle(category.title)) ?? 0;

      if (categoryCount > currentMostUsedCount) {
        currentMostUsedCount = categoryCount;
        currentMostUsedTitle = category.title;
      }
    }

    return currentMostUsedTitle;
  }, [categories, categoryItemsByTitle]);

  const emptyMessage = loading
    ? "Carregando categorias..."
    : error
      ? "Não foi possível carregar suas categorias."
      : "Nenhuma categoria encontrada.";

  async function invalidateCategoriesQueryAndRefetch(): Promise<void> {
    apolloClient.cache.evict({
      id: "ROOT_QUERY",
      fieldName: "listCategories",
    });
    apolloClient.cache.gc();

    await apolloClient.refetchQueries({
      include: [GET_CATEGORIES],
    });
  }

  async function handleDeleteCategory(id: string): Promise<void> {
    setDeletingCategoryId(id);

    try {
      const { data } = await deleteCategory({
        variables: { id },
      });

      if (data?.deleteCategory) {
        await invalidateCategoriesQueryAndRefetch();
        toast.success("Categoria removida com sucesso!");
        return;
      }

      toast.error("Não foi possível remover a categoria.");
    } catch {
      toast.error("Não foi possível remover a categoria.");
    } finally {
      setDeletingCategoryId(null);
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 py-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Categorias</h1>
          <p className="text-sm text-gray-500">
            Organize suas transações por categorias
          </p>
        </div>
        <NewCategoryModal>
          <Button variant="default" className="cursor-pointer">
            <Plus className="size-4" />
            Nova categoria
          </Button>
        </NewCategoryModal>
      </div>

      <CategoriesStats
        totalCategories={categories.length}
        totalTransactions={totalTransactions}
        mostUsedCategory={mostUsedCategory}
      />

      {categories.length === 0 ? (
        <section className="rounded-xl border border-gray-200 bg-white px-6 py-10 text-center text-gray-500">
          {emptyMessage}
        </section>
      ) : (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              title={category.title}
              description={category.description}
              items={
                categoryItemsByTitle.get(
                  normalizeCategoryTitle(category.title),
                ) ?? 0
              }
              icon={category.icon}
              color={category.color}
              isDeleting={deletingCategoryId === category.id}
              onDelete={() => handleDeleteCategory(category.id)}
              editAction={
                <NewCategoryModal category={category}>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    className="h-8 w-8 cursor-pointer rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100"
                  >
                    <SquarePen className="size-4" />
                  </Button>
                </NewCategoryModal>
              }
            />
          ))}
        </section>
      )}
    </div>
  );
}
