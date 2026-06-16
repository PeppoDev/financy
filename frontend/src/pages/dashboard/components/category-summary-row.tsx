import { categoriesMap } from "@/lib/categories";

import type { CategorySummary } from "../dashboard.types";

type CategorySummaryRowProps = {
  category: CategorySummary;
};

export function CategorySummaryRow({ category }: CategorySummaryRowProps) {
  const meta = categoriesMap[category.categoryKey];
  const Icon = meta.icon;

  return (
    <div className="grid grid-cols-[1fr_auto_auto] items-center gap-3">
      <div>
        <span
          className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${meta.badgeClassName}`}
        >
          {meta.label}
        </span>
      </div>
      <span className="text-sm text-gray-500">
        {category.items} {category.items === 1 ? "item" : "itens"}
      </span>
      <span className="text-sm font-semibold text-gray-800">
        {category.total}
      </span>
    </div>
  );
}
