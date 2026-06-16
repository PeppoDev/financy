import type { CategoryKey } from "@/lib/categories";

export type TransactionType = "entrada" | "saida";

export type Transaction = {
  id: string;
  description: string;
  date: string;
  category: CategoryKey;
  type: TransactionType;
  amount: string;
};
