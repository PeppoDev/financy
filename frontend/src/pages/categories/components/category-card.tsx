import type { ReactNode } from "react";
import { Tag, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  type CategoryColorEnum,
  categoryIconOptions,
} from "@/utils/category/category-enums";

type CategoryCardProps = {
  title: string;
  description: string;
  items: number;
  icon: string;
  color: string;
  onDelete: () => void;
  isDeleting?: boolean;
  editAction?: ReactNode;
};

const colorStylesByValue: Record<
  CategoryColorEnum,
  {
    iconContainerClassName: string;
    iconClassName: string;
    badgeClassName: string;
  }
> = {
  green: {
    iconContainerClassName: "bg-emerald-100",
    iconClassName: "text-emerald-700",
    badgeClassName: "bg-emerald-100 text-emerald-700",
  },
  blue: {
    iconContainerClassName: "bg-blue-100",
    iconClassName: "text-blue-700",
    badgeClassName: "bg-blue-100 text-blue-700",
  },
  purple: {
    iconContainerClassName: "bg-violet-100",
    iconClassName: "text-violet-700",
    badgeClassName: "bg-violet-100 text-violet-700",
  },
  pink: {
    iconContainerClassName: "bg-pink-100",
    iconClassName: "text-pink-700",
    badgeClassName: "bg-pink-100 text-pink-700",
  },
  red: {
    iconContainerClassName: "bg-red-100",
    iconClassName: "text-red-700",
    badgeClassName: "bg-red-100 text-red-700",
  },
  orange: {
    iconContainerClassName: "bg-orange-100",
    iconClassName: "text-orange-700",
    badgeClassName: "bg-orange-100 text-orange-700",
  },
  yellow: {
    iconContainerClassName: "bg-amber-100",
    iconClassName: "text-amber-700",
    badgeClassName: "bg-amber-100 text-amber-700",
  },
};

export function CategoryCard({
  title,
  description,
  items,
  icon,
  color,
  onDelete,
  isDeleting,
  editAction,
}: CategoryCardProps) {
  const Icon =
    categoryIconOptions.find((option) => option.enumValue === icon)?.icon ??
    Tag;
  const colorStyles = colorStylesByValue[color as CategoryColorEnum] ?? {
    iconContainerClassName: "bg-gray-100",
    iconClassName: "text-gray-500",
    badgeClassName: "bg-gray-100 text-gray-700",
  };
  const label = title;

  return (
    <Card className="bg-white">
      <CardContent className="space-y-4 p-5">
        <div className="flex items-center justify-between">
          <span
            className={`flex size-10 items-center justify-center rounded-lg ${
              colorStyles.iconContainerClassName
            }`}
          >
            <Icon className={`size-4 ${colorStyles.iconClassName}`} />
          </span>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              disabled={isDeleting}
              onClick={onDelete}
              className="h-8 w-8 cursor-pointer rounded-lg border border-gray-200 text-red-400 hover:bg-red-50"
            >
              <Trash className="size-4" />
            </Button>
            {editAction}
          </div>
        </div>

        <div className="space-y-1">
          <h3 className="text-base font-semibold text-gray-800">{label}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>

        <div className="flex items-center justify-between">
          <span
            className={`rounded-full px-3 py-1 text-sm font-medium ${
              colorStyles.badgeClassName
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
