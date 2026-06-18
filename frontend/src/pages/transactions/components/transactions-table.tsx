import type { ReactNode } from "react";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  ChevronLeft,
  ChevronRight,
  Tag,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  type CategoryColorEnum,
  categoryIconOptions,
} from "@/utils/category/category-enums";

type TransactionTypeView = "entrada" | "saida";

export type TransactionTableRowData = {
  id: string;
  description: string;
  date: string;
  dateISO: string;
  categoryId: string;
  categoryTitle: string;
  categoryIcon: string;
  categoryColor: string;
  type: TransactionTypeView;
  amount: string;
  onEditAction: ReactNode;
};

type TransactionsTableProps = {
  data: TransactionTableRowData[];
  isDeletingId: string | null;
  onDelete: (id: string) => void;
  emptyMessage: string;
  currentPage: number;
  totalPages: number;
  totalResults: number;
  resultStart: number;
  resultEnd: number;
  onPageChange: (page: number) => void;
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

function buildVisiblePages(currentPage: number, totalPages: number): number[] {
  if (totalPages <= 3) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const start = Math.max(1, Math.min(currentPage - 1, totalPages - 2));

  return [start, start + 1, start + 2];
}

export function TransactionsTable({
  data,
  isDeletingId,
  onDelete,
  emptyMessage,
  currentPage,
  totalPages,
  totalResults,
  resultStart,
  resultEnd,
  onPageChange,
}: TransactionsTableProps) {
  const visiblePages = buildVisiblePages(currentPage, totalPages);

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200">
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow className="hover:bg-transparent">
            <TableHead className="h-12 px-4 text-[11px] font-semibold tracking-wide uppercase text-gray-500">
              Descrição
            </TableHead>
            <TableHead className="h-12 w-27.5 text-[11px] font-semibold tracking-wide uppercase text-gray-500">
              Data
            </TableHead>
            <TableHead className="h-12 w-40 text-[11px] font-semibold tracking-wide uppercase text-gray-500">
              Categoria
            </TableHead>
            <TableHead className="h-12 w-32.5 text-[11px] font-semibold tracking-wide uppercase text-gray-500">
              Tipo
            </TableHead>
            <TableHead className="h-12 w-32.5 text-[11px] font-semibold tracking-wide uppercase text-gray-500">
              Valor
            </TableHead>
            <TableHead className="h-12 w-27.5 text-right text-[11px] font-semibold tracking-wide uppercase text-gray-500">
              Ações
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-20 text-center text-gray-500">
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            data.map((transaction) => {
              const CategoryIcon =
                categoryIconOptions.find(
                  (option) => option.enumValue === transaction.categoryIcon,
                )?.icon ?? Tag;
              const categoryColorStyles = colorStylesByValue[
                transaction.categoryColor as CategoryColorEnum
              ] ?? {
                iconContainerClassName: "bg-gray-100",
                iconClassName: "text-gray-500",
                badgeClassName: "bg-gray-100 text-gray-700",
              };

              return (
                <TableRow
                  key={transaction.id}
                  className="h-13 hover:bg-gray-50"
                >
                  <TableCell className="px-4">
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex size-8 items-center justify-center rounded-lg ${categoryColorStyles.iconContainerClassName}`}
                      >
                        <CategoryIcon
                          className={`size-4 ${categoryColorStyles.iconClassName}`}
                        />
                      </span>
                      <span className="text-sm font-medium text-gray-800">
                        {transaction.description}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {transaction.date}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${categoryColorStyles.badgeClassName}`}
                    >
                      {transaction.categoryTitle}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`flex items-center gap-1 text-sm font-medium ${
                        transaction.type === "entrada"
                          ? "text-emerald-600"
                          : "text-red-500"
                      }`}
                    >
                      {transaction.type === "entrada" ? (
                        <ArrowUpCircle className="size-4" />
                      ) : (
                        <ArrowDownCircle className="size-4" />
                      )}
                      {transaction.type === "entrada" ? "Entrada" : "Saída"}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm font-semibold text-gray-700">
                    {transaction.amount}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        disabled={isDeletingId === transaction.id}
                        onClick={() => onDelete(transaction.id)}
                        className="h-7 w-7 cursor-pointer rounded-md border border-gray-200 text-red-400 hover:bg-red-50"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                      {transaction.onEditAction}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 text-xs text-gray-500">
        <span>
          {resultStart} a {resultEnd} | {totalResults} resultados
        </span>
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            disabled={currentPage <= 1}
            onClick={() => onPageChange(currentPage - 1)}
            className="h-7 w-7 cursor-pointer rounded-md border border-gray-200"
          >
            <ChevronLeft className="size-4" />
          </Button>

          {visiblePages.map((page) => (
            <Button
              key={page}
              type="button"
              variant={page === currentPage ? "default" : "ghost"}
              size="icon-xs"
              onClick={() => onPageChange(page)}
              className={
                page === currentPage
                  ? "h-7 w-7 cursor-pointer rounded-md p-0 text-xs"
                  : "h-7 w-7 cursor-pointer rounded-md border border-gray-200 text-xs"
              }
            >
              {page}
            </Button>
          ))}

          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            disabled={currentPage >= totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            className="h-7 w-7 cursor-pointer rounded-md border border-gray-200"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
