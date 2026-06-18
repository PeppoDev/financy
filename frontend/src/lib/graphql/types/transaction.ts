export type ListTransactionsQueryData = {
  listTransactions: Array<{
    id: string;
    type: string;
    description: string;
    date: string;
    value: number;
    category?: {
      title: string;
    } | null;
  }>;
};
