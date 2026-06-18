import { useMemo } from "react";
import { useQuery } from "@apollo/client/react";
import { Plus } from "lucide-react";

import { getCategoryMeta } from "@/lib/categories";
import { GET_CATEGORIES } from "@/lib/graphql/queries/category";
import { GET_TRANSACTIONS } from "@/lib/graphql/queries/transaction";
import { type ListCategoriesQueryData } from "@/lib/graphql/types/category";
import { type ListTransactionsQueryData } from "@/lib/graphql/types/transaction";
import { Button } from "@/components/ui/button";
import { NewCategoryModal } from "./components/new-category-modal";
import { CategoriesStats } from "./components/categories-stats";
import { CategoryCard } from "./components/category-card";

type CategoryCardData = {
  id: string;
  title: string;
  description: string;
};

function normalizeCategoryTitle(value: string) {
  return value.trim().toLowerCase();
}

export function Categories() {
  const {
    data: categoriesData,
    loading,
    error,
  } = useQuery<ListCategoriesQueryData>(GET_CATEGORIES);
  const { data: transactionsData } =
    useQuery<ListTransactionsQueryData>(GET_TRANSACTIONS);

  const categories = useMemo<CategoryCardData[]>(() => {
    if (!categoriesData?.listCategories) {
      return [];
    }

    return categoriesData.listCategories.map((category) => ({
      id: category.id,
      title: category.title,
      description: category.description?.trim() ?? "",
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
          <Button variant="default">
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
              categoryMeta={getCategoryMeta(category.title)}
              description={category.description}
              items={
                categoryItemsByTitle.get(
                  normalizeCategoryTitle(category.title),
                ) ?? 0
              }
            />
          ))}
        </section>
      )}
    </div>
  );
}
