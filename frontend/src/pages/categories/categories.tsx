import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { NewCategoryModal } from "./components/new-category-modal";
import { CategoriesStats } from "./components/categories-stats";
import { CategoryCard } from "./components/category-card";
import {
  categories,
  getCategoryDescription,
  getCategoryItems,
} from "./categories.data";

export function Categories() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 py-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Categorias</h1>
          <p className="text-sm text-gray-500">
            Organize suas transacoes por categorias
          </p>
        </div>
        <NewCategoryModal>
          <Button variant="default">
            <Plus className="size-4" />
            Nova categoria
          </Button>
        </NewCategoryModal>
      </div>

      <CategoriesStats />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {categories.map((category) => (
          <CategoryCard
            key={category.key}
            category={category}
            description={getCategoryDescription(category.key)}
            items={getCategoryItems(category.key)}
          />
        ))}
      </section>
    </div>
  );
}
