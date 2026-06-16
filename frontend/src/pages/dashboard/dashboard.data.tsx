import { ArrowDownCircle, ArrowUpCircle, Landmark } from "lucide-react";

import type {
  CategorySummary,
  SummaryCard,
  TransactionRow,
} from "./dashboard.types";

export const summaryCards: SummaryCard[] = [
  {
    title: "Saldo total",
    value: "R$ 12.847,32",
    icon: <Landmark className="size-4 text-violet-500" />,
  },
  {
    title: "Receitas do mes",
    value: "R$ 4.250,00",
    icon: <ArrowUpCircle className="size-4 text-emerald-600" />,
  },
  {
    title: "Despesas do mes",
    value: "R$ 2.180,45",
    icon: <ArrowDownCircle className="size-4 text-red-500" />,
  },
];

export const recentTransactions: TransactionRow[] = [
  {
    id: "1",
    description: "Pagamento de Salario",
    date: "01/12/25",
    category: "Receita",
    amount: "+ R$ 4.250,00",
    type: "entrada",
  },
  {
    id: "2",
    description: "Jantar no Restaurante",
    date: "30/11/25",
    category: "Alimentacao",
    amount: "- R$ 89,50",
    type: "saida",
  },
  {
    id: "3",
    description: "Posto de Gasolina",
    date: "29/11/25",
    category: "Transporte",
    amount: "- R$ 100,00",
    type: "saida",
  },
  {
    id: "4",
    description: "Compras no Mercado",
    date: "28/11/25",
    category: "Mercado",
    amount: "- R$ 156,80",
    type: "saida",
  },
  {
    id: "5",
    description: "Retorno de Investimento",
    date: "26/11/25",
    category: "Investimento",
    amount: "+ R$ 340,25",
    type: "entrada",
  },
];

export const categorySummaries: CategorySummary[] = [
  { categoryKey: "alimentacao", items: 12, total: "R$ 542,30" },
  { categoryKey: "transporte", items: 8, total: "R$ 385,50" },
  { categoryKey: "mercado", items: 3, total: "R$ 298,75" },
  { categoryKey: "entretenimento", items: 2, total: "R$ 186,20" },
  { categoryKey: "utilidades", items: 7, total: "R$ 245,80" },
];
