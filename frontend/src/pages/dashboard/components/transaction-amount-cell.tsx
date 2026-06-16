import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";

import type { TransactionType } from "../dashboard.types";

type TransactionAmountCellProps = {
  amount: string;
  type: TransactionType;
};

export function TransactionAmountCell({
  amount,
  type,
}: TransactionAmountCellProps) {
  const amountIcon =
    type === "entrada" ? (
      <ArrowUpCircle className="size-4 text-emerald-600" />
    ) : (
      <ArrowDownCircle className="size-4 text-red-500" />
    );

  return (
    <div className="flex justify-center">
      <span className="flex items-center gap-2 font-semibold text-gray-800">
        {amount}
        {amountIcon}
      </span>
    </div>
  );
}
