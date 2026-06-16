import { SquarePen, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { CategoryMeta } from "@/lib/categories";

type CategoryCardProps = {
  category: CategoryMeta;
  description: string;
  items: number;
};

export function CategoryCard({
  category,
  description,
  items,
}: CategoryCardProps) {
  const Icon = category.icon;

  return (
    <Card className="bg-white">
      <CardContent className="space-y-4 p-5">
        <div className="flex items-center justify-between">
          <span
            className={`flex size-10 items-center justify-center rounded-lg ${category.iconContainerClassName}`}
          >
            <Icon className={`size-4 ${category.iconClassName}`} />
          </span>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="h-8 w-8 rounded-lg border border-gray-200 text-red-400 hover:bg-red-50"
            >
              <Trash className="size-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="h-8 w-8 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100"
            >
              <SquarePen className="size-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-1">
          <h3 className="text-base font-semibold text-gray-800">
            {category.label}
          </h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>

        <div className="flex items-center justify-between">
          <span
            className={`rounded-full px-3 py-1 text-sm font-medium ${category.badgeClassName}`}
          >
            {category.label}
          </span>
          <span className="text-sm text-gray-500">{items} itens</span>
        </div>
      </CardContent>
    </Card>
  );
}
