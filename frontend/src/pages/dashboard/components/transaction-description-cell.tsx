import { getCategoryMeta } from "@/lib/categories";

type TransactionDescriptionCellProps = {
  category: string;
  description: string;
  date: string;
};

export function TransactionDescriptionCell({
  category,
  description,
  date,
}: TransactionDescriptionCellProps) {
  const categoryMeta = getCategoryMeta(category);
  const Icon = categoryMeta?.icon;

  return (
    <div className="flex flex-row items-center gap-3">
      <div
        className={`flex size-8 items-center justify-center rounded-lg ${
          categoryMeta?.iconContainerClassName ?? "bg-gray-100"
        }`}
      >
        {Icon ? (
          <Icon
            className={`size-4 ${categoryMeta?.iconClassName ?? "text-gray-600"}`}
          />
        ) : (
          <span className="text-xs font-medium text-gray-600">?</span>
        )}
      </div>
      <div className="flex flex-col">
        <span className="font-medium text-gray-900">{description}</span>
        <span className="text-xs text-gray-500">{date}</span>
      </div>
    </div>
  );
}
