export type ListTransactionsQueryData = {
  listTransactions: Array<{
    id: string;
    type: string;
    description: string;
    date: string;
    value: number;
    category?: {
      id: string;
      title: string;
      icon: string;
      color: string;
    } | null;
  }>;
};

export type CreateTransactionMutationData = {
  createTransaction: {
    id: string;
    type: string;
    description: string;
    date: string;
    value: number;
  };
};

export type CreateTransactionMutationVariables = {
  data: {
    type: string;
    description: string;
    date: Date;
    value: number;
    categoryId: string;
  };
};

export type UpdateTransactionMutationData = {
  updateTransaction: {
    id: string;
    type: string;
    description: string;
    date: string;
    value: number;
  };
};

export type UpdateTransactionMutationVariables = {
  id: string;
  data: {
    type: string;
    description: string;
    date: Date;
    value: number;
    categoryId: string;
  };
};

export type DeleteTransactionMutationData = {
  deleteTransaction: {
    id: string;
  };
};

export type DeleteTransactionMutationVariables = {
  id: string;
};
