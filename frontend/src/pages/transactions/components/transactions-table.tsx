import {
  ArrowDownCircle,
  ArrowUpCircle,
  ChevronLeft,
  ChevronRight,
  Pencil,
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
import { categoriesMap } from "@/lib/categories";
import { transactions } from "../transactions.data";

export function TransactionsTable() {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200">
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow className="hover:bg-transparent">
            <TableHead className="h-12 px-4 text-[11px] font-semibold tracking-wide uppercase text-gray-500">
              Descricao
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
              Acoes
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => {
            const category = categoriesMap[transaction.category];
            const Icon = category.icon;

            return (
              <TableRow key={transaction.id} className="h-13 hover:bg-gray-50">
                <TableCell className="px-4">
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex size-8 items-center justify-center rounded-lg ${category.iconContainerClassName}`}
                    >
                      <Icon className={`size-4 ${category.iconClassName}`} />
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
                    className={`rounded-full px-3 py-1 text-xs font-medium ${category.badgeClassName}`}
                  >
                    {category.label}
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
                    {transaction.type === "entrada" ? "Entrada" : "Saida"}
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
                      className="h-7 w-7 rounded-md border border-gray-200 text-red-400 hover:bg-red-50"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      className="h-7 w-7 rounded-md border border-gray-200 text-gray-500 hover:bg-gray-100"
                    >
                      <Pencil className="size-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 text-xs text-gray-500">
        <span>1 a 10 | 27 resultados</span>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon-xs"
            className="h-7 w-7 rounded-md border border-gray-200"
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button className="h-7 w-7 rounded-md p-0 text-xs">1</Button>
          <Button
            variant="ghost"
            size="icon-xs"
            className="h-7 w-7 rounded-md border border-gray-200 text-xs"
          >
            2
          </Button>
          <Button
            variant="ghost"
            size="icon-xs"
            className="h-7 w-7 rounded-md border border-gray-200 text-xs"
          >
            3
          </Button>
          <Button
            variant="ghost"
            size="icon-xs"
            className="h-7 w-7 rounded-md border border-gray-200"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
