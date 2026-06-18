import type { CategoryKey } from "@/lib/categories";

export type TransactionType = "entrada" | "saida";

export type TransactionRow = {
  id: string;
  description: string;
  date: string;
  category: string;
  amount: string;
  type: TransactionType;
};

export type CategorySummary = {
  label: string;
  categoryKey?: CategoryKey;
  items: number;
  total: string;
};

type SummaryCard = {
  title: string;
  value: string;
  icon: React.ReactNode;
};

export type { SummaryCard };
