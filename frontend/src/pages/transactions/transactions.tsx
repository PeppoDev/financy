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

function mapBackendTypeToView(type: string): "entrada" | "saida" {
  return type === "income" ? "entrada" : "saida";
}

export function Transactions() {
  const apolloClient = useApolloClient();
  const [deletingTransactionId, setDeletingTransactionId] = useState<
    string | null
  >(null);

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

  const emptyMessage = loading
    ? "Carregando transações..."
    : error
      ? "Não foi possível carregar suas transações."
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
        <CardContent className="p-4">
          <TransactionsTable
            data={rows}
            isDeletingId={deletingTransactionId}
            onDelete={handleDeleteTransaction}
            emptyMessage={emptyMessage}
          />
        </CardContent>
      </Card>
    </div>
  );
}
