import { ChevronRight, Plus } from "lucide-react";

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
import { CategorySummaryRow } from "./components/category-summary-row";
import { NewTransactionModal } from "./components/new-transaction-modal";
import { transactionColumns } from "./dashboard.columns";
import {
  categorySummaries,
  recentTransactions,
  summaryCards,
} from "./dashboard.data";

export function Dashboard() {
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

        <Card className="bg-white md:col-span-2 xl:col-span-2">
          <CardHeader className="border-b border-gray-200 py-5.5 pl-6 pr-3 flex flex-row justify-between items-center">
            <CardTitle className="text-sm font-semibold tracking-wide uppercase text-gray-500">
              Transações recentes
            </CardTitle>
            <CardAction>
              <Button variant="link" className="text-primary">
                Ver todas
                <ChevronRight className="size-4" />
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <DataTable
              columns={transactionColumns}
              data={recentTransactions}
              getRowKey={(row) => row.id}
              hideHeader
            />
            <div className="border-t border-gray-200 p-3">
              <NewTransactionModal>
                <Button variant="ghost" className="w-full text-primary">
                  <Plus className="size-4" />
                  Nova transacao
                </Button>
              </NewTransactionModal>
            </div>
          </CardContent>
        </Card>

        <Card className="self-start bg-white xl:col-span-1 py-6">
          <CardHeader className="border-b border-gray-200 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-semibold tracking-wide uppercase text-gray-500">
              Categorias
            </CardTitle>
            <CardAction>
              <Button variant="link" className="text-primary">
                Gerenciar
                <ChevronRight className="size-4" />
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className="space-y-4 pt-5">
            {categorySummaries.map((category) => (
              <CategorySummaryRow
                key={category.categoryKey}
                category={category}
              />
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
