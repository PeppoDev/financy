import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const transactionTypes = ["despesa", "receita"] as const;

export const newTransactionSchema = z.object({
  transactionType: z.enum(transactionTypes),
  description: z.string().trim(),
  date: z
    .date()
    .optional()
    .refine((value) => Boolean(value), "Selecione uma data."),
  amount: z.string(),
  category: z.string().min(1, "Selecione uma categoria."),
});

export type NewTransactionFormValues = z.infer<typeof newTransactionSchema>;

export function formatBrlFromDigits(value: string) {
  if (!value) {
    return "0,00";
  }

  const numeric = Number.parseInt(value, 10);

  if (Number.isNaN(numeric)) {
    return "0,00";
  }

  return (numeric / 100).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function useNewTransactionForm() {
  return useForm<NewTransactionFormValues>({
    mode: "onBlur",
    reValidateMode: "onChange",
    resolver: zodResolver(newTransactionSchema),
    defaultValues: {
      transactionType: "despesa",
      description: "",
      date: undefined,
      amount: "0,00",
      category: "",
    },
  });
}
