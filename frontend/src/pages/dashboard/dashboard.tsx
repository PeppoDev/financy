import { useMemo } from "react";
import { useQuery } from "@apollo/client/react";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  ChevronRight,
  Landmark,
  Plus,
} from "lucide-react";

import { MetricCard } from "@/components/cards/metric-card";
import { DataTable } from "@/components/tables/data-table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCategoryKey } from "@/lib/categories";
import { GET_CATEGORIES } from "@/lib/graphql/queries/category";
import { GET_TRANSACTIONS } from "@/lib/graphql/queries/transaction";
import { type ListCategoriesQueryData } from "@/lib/graphql/types/category";
import { type ListTransactionsQueryData } from "@/lib/graphql/types/transaction";
import { cn } from "@/lib/utils";
import { CategorySummaryRow } from "./components/category-summary-row";
import { NewTransactionModal } from "./components/new-transaction-modal";
import { transactionColumns } from "./dashboard.columns";
import type {
  CategorySummary,
  SummaryCard,
  TransactionRow,
  TransactionType,
} from "./dashboard.types";

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "2-digit",
});

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

function mapTransactionType(type: string): TransactionType {
  return type === "income" ? "entrada" : "saida";
}

export function Dashboard() {
  const {
    data: transactionsData,
    loading: transactionsLoading,
    error: transactionsError,
  } = useQuery<ListTransactionsQueryData>(GET_TRANSACTIONS);
  const {
    data: categoriesData,
    loading: categoriesLoading,
    error: categoriesError,
  } = useQuery<ListCategoriesQueryData>(GET_CATEGORIES);

  const recentTransactions = useMemo<TransactionRow[]>(() => {
    if (!transactionsData?.listTransactions) {
      return [];
    }

    return [...transactionsData.listTransactions]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .map((transaction) => {
        const mappedType = mapTransactionType(transaction.type);
        const amountPrefix = mappedType === "entrada" ? "+" : "-";
        const parsedDate = new Date(transaction.date);

        return {
          id: transaction.id,
          description: transaction.description,
          date: Number.isNaN(parsedDate.getTime())
            ? "-"
            : dateFormatter.format(parsedDate),
          category: transaction.category?.title ?? "Sem categoria",
          amount: `${amountPrefix} ${currencyFormatter.format(Math.abs(transaction.value))}`,
          type: mappedType,
        };
      });
  }, [transactionsData]);

  const summaryCards = useMemo<SummaryCard[]>(() => {
    const now = new Date();
    let totalBalance = 0;
    let currentMonthIncome = 0;
    let currentMonthExpense = 0;

    for (const transaction of transactionsData?.listTransactions ?? []) {
      const absoluteValue = Math.abs(transaction.value);
      const isIncome = transaction.type === "income";

      totalBalance += isIncome ? absoluteValue : -absoluteValue;

      const parsedDate = new Date(transaction.date);

      if (Number.isNaN(parsedDate.getTime())) {
        continue;
      }

      const isCurrentMonth =
        parsedDate.getMonth() === now.getMonth() &&
        parsedDate.getFullYear() === now.getFullYear();

      if (!isCurrentMonth) {
        continue;
      }

      if (isIncome) {
        currentMonthIncome += absoluteValue;
      } else {
        currentMonthExpense += absoluteValue;
      }
    }

    return [
      {
        title: "Saldo total",
        value: currencyFormatter.format(totalBalance),
        icon: <Landmark className="size-4 text-violet-500" />,
      },
      {
        title: "Receitas do mes",
        value: currencyFormatter.format(currentMonthIncome),
        icon: <ArrowUpCircle className="size-4 text-emerald-600" />,
      },
      {
        title: "Despesas do mes",
        value: currencyFormatter.format(currentMonthExpense),
        icon: <ArrowDownCircle className="size-4 text-red-500" />,
      },
    ];
  }, [transactionsData]);

  const categorySummaries = useMemo<CategorySummary[]>(() => {
    const listedCategories = categoriesData?.listCategories ?? [];

    if (listedCategories.length === 0) {
      return [];
    }

    const transactionStatsByCategoryTitle = new Map<
      string,
      { items: number; total: number }
    >();

    for (const transaction of transactionsData?.listTransactions ?? []) {
      const categoryTitle = transaction.category?.title;

      if (!categoryTitle) {
        continue;
      }

      const key = categoryTitle.trim().toLowerCase();
      const current = transactionStatsByCategoryTitle.get(key) ?? {
        items: 0,
        total: 0,
      };

      transactionStatsByCategoryTitle.set(key, {
        items: current.items + 1,
        total: current.total + Math.abs(transaction.value),
      });
    }

    return listedCategories.map((category) => {
      const stats = transactionStatsByCategoryTitle.get(
        category.title.trim().toLowerCase(),
      );

      return {
        label: category.title,
        categoryKey: getCategoryKey(category.title),
        items: stats?.items ?? 0,
        total: currencyFormatter.format(stats?.total ?? 0),
      };
    });
  }, [categoriesData, transactionsData]);

  const tableEmptyMessage = transactionsLoading
    ? "Carregando transações..."
    : transactionsError
      ? "Não foi possível carregar suas transações."
      : "Nenhuma transação encontrada.";

  const categoryEmptyMessage = categoriesLoading
    ? "Carregando categorias..."
    : categoriesError
      ? "Nao foi possivel carregar suas categorias."
      : "Nenhuma categoria encontrada.";

  const isTransactionsTableEmpty = recentTransactions.length === 0;
  const isCategorySummaryEmpty = categorySummaries.length === 0;

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 py-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {summaryCards.map((card) => (
          <MetricCard
            key={card.title}
            title={card.title}
            value={card.value}
            icon={card.icon}
          />
        ))}

        <Card
          className={cn(
            "bg-white md:col-span-2 xl:col-span-2",
            isTransactionsTableEmpty && "min-h-88",
          )}
        >
          <CardHeader className="border-b border-gray-200 py-5.5 pl-6 pr-3 flex flex-row justify-between items-center">
            <CardTitle className="text-sm font-semibold tracking-wide uppercase text-gray-500">
              Transações recentes
            </CardTitle>
            <CardAction>
              <Button variant="link" className="text-primary cursor-pointer">
                Ver todas
                <ChevronRight className="size-4" />
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col px-0 pb-0">
            {isTransactionsTableEmpty ? (
              <p className="flex flex-1 items-center justify-center text-gray-500">
                {tableEmptyMessage}
              </p>
            ) : (
              <DataTable
                columns={transactionColumns}
                data={recentTransactions}
                getRowKey={(row) => row.id}
                hideHeader
                emptyMessage={tableEmptyMessage}
              />
            )}
            <div className="mt-auto border-t border-gray-200 p-3">
              <NewTransactionModal>
                <Button
                  variant="ghost"
                  className="w-full text-primary cursor-pointer"
                >
                  <Plus className="size-4" />
                  Nova transação
                </Button>
              </NewTransactionModal>
            </div>
          </CardContent>
        </Card>

        <Card
          className={cn(
            "self-start bg-white xl:col-span-1 py-6",
            isCategorySummaryEmpty && "min-h-88",
          )}
        >
          <CardHeader className="border-b border-gray-200 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-semibold tracking-wide uppercase text-gray-500">
              Categorias
            </CardTitle>
            {!isCategorySummaryEmpty ? (
              <CardAction>
                <Button variant="link" className="text-primary cursor-pointer">
                  Gerenciar
                  <ChevronRight className="size-4" />
                </Button>
              </CardAction>
            ) : null}
          </CardHeader>
          <CardContent
            className={cn(
              "flex flex-1 flex-col pt-5",
              !isCategorySummaryEmpty && "gap-4",
            )}
          >
            {isCategorySummaryEmpty ? (
              <p className="flex flex-1 items-center justify-center text-gray-500">
                {categoryEmptyMessage}
              </p>
            ) : (
              categorySummaries.map((category) => (
                <CategorySummaryRow
                  key={category.categoryKey}
                  category={category}
                />
              ))
            )}

            {isCategorySummaryEmpty ? (
              <div className="mt-auto border-t border-gray-200 pt-3">
                <Button
                  variant="ghost"
                  className="w-full text-primary cursor-pointer"
                >
                  Gerenciar
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            ) : null}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
