import { SquarePen, Tag, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { CategoryMeta } from "@/lib/categories";

type CategoryCardProps = {
  title: string;
  categoryMeta?: CategoryMeta;
  description: string;
  items: number;
};

export function CategoryCard({
  title,
  categoryMeta,
  description,
  items,
}: CategoryCardProps) {
  const Icon = categoryMeta?.icon ?? Tag;
  const label = categoryMeta?.label ?? title;

  return (
    <Card className="bg-white">
      <CardContent className="space-y-4 p-5">
        <div className="flex items-center justify-between">
          <span
            className={`flex size-10 items-center justify-center rounded-lg ${
              categoryMeta?.iconContainerClassName ?? "bg-gray-100"
            }`}
          >
            <Icon
              className={`size-4 ${categoryMeta?.iconClassName ?? "text-gray-500"}`}
            />
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
          <h3 className="text-base font-semibold text-gray-800">{label}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>

        <div className="flex items-center justify-between">
          <span
            className={`rounded-full px-3 py-1 text-sm font-medium ${
              categoryMeta?.badgeClassName ?? "bg-gray-100 text-gray-700"
            }`}
          >
            {label}
          </span>
          <span className="text-sm text-gray-500">{items} itens</span>
        </div>
      </CardContent>
    </Card>
  );
}
