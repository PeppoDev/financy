import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { NewTransactionModal } from "@/pages/dashboard/components/new-transaction-modal";
import { TransactionsFilters } from "./components/transactions-filters";
import { TransactionsTable } from "./components/transactions-table";

export function Transactions() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 py-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Transacoes</h1>
          <p className="text-sm text-gray-500">
            Gerencie todas as suas transacoes financeiras
          </p>
        </div>
        <NewTransactionModal>
          <Button className="h-9 rounded-md px-3 text-sm font-medium">
            <Plus className="size-4" />
            Nova transacao
          </Button>
        </NewTransactionModal>
      </div>

      <Card className="bg-white">
        <CardContent className="space-y-5 p-4">
          <TransactionsFilters />
          <TransactionsTable />
        </CardContent>
      </Card>
    </div>
  );
}
