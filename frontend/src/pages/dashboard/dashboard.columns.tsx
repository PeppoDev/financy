import type { DataTableColumn } from "@/components/tables/data-table";

import { TransactionAmountCell } from "./components/transaction-amount-cell";
import { TransactionCategoryCell } from "./components/transaction-category-cell";
import { TransactionDescriptionCell } from "./components/transaction-description-cell";
import type { TransactionRow } from "./dashboard.types";

export const transactionColumns: DataTableColumn<TransactionRow>[] = [
  {
    key: "description",
    header: "Descricao",
    cell: (row) => (
      <TransactionDescriptionCell
        category={row.category}
        description={row.description}
        date={row.date}
      />
    ),
    className: "py-4 px-6",
  },
  {
    key: "category",
    header: "Categoria",
    cell: (row) => <TransactionCategoryCell category={row.category} />,
    className: "w-[180px] text-center",
  },
  {
    key: "amount",
    header: "Valor",
    cell: (row) => (
      <TransactionAmountCell amount={row.amount} type={row.type} />
    ),
    className: "w-[180px] text-center",
  },
];
