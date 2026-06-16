import { getCategoryMeta } from "@/lib/categories";

type TransactionCategoryCellProps = {
  category: string;
};

export function TransactionCategoryCell({
  category,
}: TransactionCategoryCellProps) {
  const categoryMeta = getCategoryMeta(category);

  return (
    <div className="flex justify-center">
      <span
        className={`rounded-full px-3 py-1 text-xs font-medium ${
          categoryMeta?.badgeClassName ?? "bg-gray-100 text-gray-700"
        }`}
      >
        {category}
      </span>
    </div>
  );
}
