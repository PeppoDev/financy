import { useMemo, useState } from "react";
import { useApolloClient, useMutation, useQuery } from "@apollo/client/react";
import { Plus, SquarePen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DELETE_TRANSACTION } from "@/lib/graphql/mutations/transaction";
import { GET_TRANSACTIONS } from "@/lib/graphql/queries/transaction";
import {
  type DeleteTransactionMutationData,
  type DeleteTransactionMutationVariables,
  type ListTransactionsQueryData,
} from "@/lib/graphql/types/transaction";
import { NewTransactionModal } from "@/pages/dashboard/components/new-transaction-modal";
import { toast } from "sonner";
import { TransactionsFilters } from "./components/transactions-filters";
import {
  TransactionsTable,
  type TransactionTableRowData,
} from "./components/transactions-table";

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "2-digit",
});

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const ITEMS_PER_PAGE = 10;

type TransactionTypeFilter = "all" | "entrada" | "saida";

function mapBackendTypeToView(type: string): "entrada" | "saida" {
  return type === "income" ? "entrada" : "saida";
}

function normalizeText(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function buildPeriodKey(dateISO: string): string | null {
  const parsedDate = new Date(dateISO);

  if (Number.isNaN(parsedDate.getTime())) {
    return null;
  }

  const year = parsedDate.getUTCFullYear();
  const month = `${parsedDate.getUTCMonth() + 1}`.padStart(2, "0");

  return `${year}-${month}`;
}

function formatPeriodLabel(periodKey: string): string {
  const [yearString, monthString] = periodKey.split("-");
  const year = Number(yearString);
  const month = Number(monthString);

  if (Number.isNaN(year) || Number.isNaN(month)) {
    return periodKey;
  }

  const periodDate = new Date(Date.UTC(year, month - 1, 1));
  const label = new Intl.DateTimeFormat("pt-BR", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  })
    .format(periodDate)
    .replace(" de ", " / ");

  return label.charAt(0).toUpperCase() + label.slice(1);
}

export function Transactions() {
  const apolloClient = useApolloClient();
  const [deletingTransactionId, setDeletingTransactionId] = useState<
    string | null
  >(null);
  const [searchValue, setSearchValue] = useState("");
  const [typeValue, setTypeValue] = useState<TransactionTypeFilter>("all");
  const [categoryValue, setCategoryValue] = useState("all");
  const [periodValue, setPeriodValue] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: transactionsData,
    loading,
    error,
  } = useQuery<ListTransactionsQueryData>(GET_TRANSACTIONS);

  const [deleteTransaction] = useMutation<
    DeleteTransactionMutationData,
    DeleteTransactionMutationVariables
  >(DELETE_TRANSACTION);

  const rows = useMemo<TransactionTableRowData[]>(() => {
    if (!transactionsData?.listTransactions) {
      return [];
    }

    return [...transactionsData.listTransactions]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .map((transaction) => {
        const transactionTypeView = mapBackendTypeToView(transaction.type);
        const amountPrefix = transactionTypeView === "entrada" ? "+" : "-";
        const parsedDate = new Date(transaction.date);

        return {
          id: transaction.id,
          description: transaction.description,
          date: Number.isNaN(parsedDate.getTime())
            ? "-"
            : dateFormatter.format(parsedDate),
          dateISO: transaction.date,
          categoryId: transaction.category?.id ?? "uncategorized",
          categoryTitle: transaction.category?.title ?? "Sem categoria",
          categoryIcon: transaction.category?.icon ?? "",
          categoryColor: transaction.category?.color ?? "",
          type: transactionTypeView,
          amount: `${amountPrefix} ${currencyFormatter.format(Math.abs(transaction.value))}`,
          onEditAction: (
            <NewTransactionModal
              transaction={{
                id: transaction.id,
                type: transaction.type,
                description: transaction.description,
                date: transaction.date,
                value: transaction.value,
                categoryId: transaction.category?.id ?? "",
              }}
            >
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="h-7 w-7 cursor-pointer rounded-md border border-gray-200 text-gray-500 hover:bg-gray-100"
              >
                <SquarePen className="size-4" />
              </Button>
            </NewTransactionModal>
          ),
        };
      });
  }, [transactionsData]);

  const categoryOptions = useMemo(() => {
    const categoriesMap = new Map<string, string>();

    rows.forEach((row) => {
      if (!categoriesMap.has(row.categoryId)) {
        categoriesMap.set(row.categoryId, row.categoryTitle);
      }
    });

    return Array.from(categoriesMap.entries())
      .map(([value, label]) => ({ value, label }))
      .sort((a, b) => a.label.localeCompare(b.label, "pt-BR"));
  }, [rows]);

  const periodOptions = useMemo(() => {
    const periods = new Set<string>();

    rows.forEach((row) => {
      const periodKey = buildPeriodKey(row.dateISO);

      if (periodKey) {
        periods.add(periodKey);
      }
    });

    return Array.from(periods)
      .sort((a, b) => b.localeCompare(a))
      .map((value) => ({
        value,
        label: formatPeriodLabel(value),
      }));
  }, [rows]);

  const effectivePeriodValue = useMemo(() => {
    if (
      periodValue &&
      (periodValue === "all" ||
        periodOptions.some(
          (periodOption) => periodOption.value === periodValue,
        ))
    ) {
      return periodValue;
    }

    return periodOptions[0]?.value ?? "all";
  }, [periodOptions, periodValue]);

  const filteredRows = useMemo(() => {
    const normalizedSearch = normalizeText(searchValue);

    return rows.filter((row) => {
      if (
        normalizedSearch &&
        !normalizeText(row.description).includes(normalizedSearch)
      ) {
        return false;
      }

      if (typeValue !== "all" && row.type !== typeValue) {
        return false;
      }

      if (categoryValue !== "all" && row.categoryId !== categoryValue) {
        return false;
      }

      if (effectivePeriodValue !== "all") {
        const periodKey = buildPeriodKey(row.dateISO);

        if (periodKey !== effectivePeriodValue) {
          return false;
        }
      }

      return true;
    });
  }, [rows, searchValue, typeValue, categoryValue, effectivePeriodValue]);

  const totalResults = filteredRows.length;
  const totalPages = Math.max(1, Math.ceil(totalResults / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedRows = useMemo(() => {
    const start = (safeCurrentPage - 1) * ITEMS_PER_PAGE;

    return filteredRows.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredRows, safeCurrentPage]);

  const resultStart =
    totalResults === 0 ? 0 : (safeCurrentPage - 1) * ITEMS_PER_PAGE + 1;
  const resultEnd =
    totalResults === 0
      ? 0
      : Math.min(safeCurrentPage * ITEMS_PER_PAGE, totalResults);

  const hasActiveFilters =
    Boolean(searchValue.trim()) ||
    typeValue !== "all" ||
    categoryValue !== "all" ||
    effectivePeriodValue !== "all";

  const emptyMessage = loading
    ? "Carregando transações..."
    : error
      ? "Não foi possível carregar suas transações."
      : hasActiveFilters
        ? "Nenhuma transação encontrada para os filtros aplicados."
        : "Nenhuma transação encontrada.";

  async function invalidateTransactionsQueryAndRefetch(): Promise<void> {
    apolloClient.cache.evict({
      id: "ROOT_QUERY",
      fieldName: "listTransactions",
    });
    apolloClient.cache.gc();

    await apolloClient.refetchQueries({
      include: [GET_TRANSACTIONS],
    });
  }

  async function handleDeleteTransaction(id: string): Promise<void> {
    setDeletingTransactionId(id);

    try {
      const { data } = await deleteTransaction({
        variables: { id },
      });

      if (data?.deleteTransaction) {
        await invalidateTransactionsQueryAndRefetch();
        toast.success("Transação removida com sucesso!");
        return;
      }

      toast.error("Não foi possível remover a transação.");
    } catch {
      toast.error("Não foi possível remover a transação.");
    } finally {
      setDeletingTransactionId(null);
    }
  }

  function handleSearchChange(value: string) {
    setSearchValue(value);
    setCurrentPage(1);
  }

  function handleTypeChange(value: string) {
    setTypeValue(value as TransactionTypeFilter);
    setCurrentPage(1);
  }

  function handleCategoryChange(value: string) {
    setCategoryValue(value);
    setCurrentPage(1);
  }

  function handlePeriodChange(value: string) {
    setPeriodValue(value);
    setCurrentPage(1);
  }

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 py-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Transações</h1>
          <p className="text-sm text-gray-500">
            Gerencie todas as suas transações financeiras
          </p>
        </div>
        <NewTransactionModal>
          <Button className="h-9 cursor-pointer rounded-md px-3 text-sm font-medium">
            <Plus className="size-4" />
            Nova transação
          </Button>
        </NewTransactionModal>
      </div>

      <Card className="bg-white">
        <CardContent className="space-y-5 p-4">
          <TransactionsFilters
            searchValue={searchValue}
            onSearchChange={handleSearchChange}
            typeValue={typeValue}
            onTypeChange={handleTypeChange}
            categoryValue={categoryValue}
            onCategoryChange={handleCategoryChange}
            periodValue={effectivePeriodValue}
            onPeriodChange={handlePeriodChange}
            categoryOptions={categoryOptions}
            periodOptions={periodOptions}
          />

          <TransactionsTable
            data={paginatedRows}
            isDeletingId={deletingTransactionId}
            onDelete={handleDeleteTransaction}
            emptyMessage={emptyMessage}
            currentPage={safeCurrentPage}
            totalPages={totalPages}
            totalResults={totalResults}
            resultStart={resultStart}
            resultEnd={resultEnd}
            onPageChange={setCurrentPage}
          />
        </CardContent>
      </Card>
    </div>
  );
}
