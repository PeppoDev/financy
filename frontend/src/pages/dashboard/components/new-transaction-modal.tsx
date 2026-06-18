import { useState, type ReactNode } from "react";
import { useApolloClient, useMutation, useQuery } from "@apollo/client/react";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  CalendarDays,
  Tag,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CREATE_TRANSACTION,
  UPDATE_TRANSACTION,
} from "@/lib/graphql/mutations/transaction";
import { GET_CATEGORIES } from "@/lib/graphql/queries/category";
import { GET_TRANSACTIONS } from "@/lib/graphql/queries/transaction";
import { type ListCategoriesQueryData } from "@/lib/graphql/types/category";
import {
  type CreateTransactionMutationData,
  type CreateTransactionMutationVariables,
  type UpdateTransactionMutationData,
  type UpdateTransactionMutationVariables,
} from "@/lib/graphql/types/transaction";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  categoryColorOptions,
  categoryIconOptions,
} from "@/utils/category/category-enums";
import {
  formatBrlFromDigits,
  formatBrlFromNumber,
  parseBrlToNumber,
  useNewTransactionForm,
  type NewTransactionFormValues,
} from "../new-transaction-form";

type EditableTransaction = {
  id: string;
  type: string;
  description: string;
  date: string;
  value: number;
  categoryId: string;
};

type NewTransactionModalProps = {
  children: ReactNode;
  transaction?: EditableTransaction;
};

function formatDate(date: Date) {
  return date.toLocaleDateString("pt-BR");
}

function mapBackendTypeToForm(
  type: string,
): NewTransactionFormValues["transactionType"] {
  return type === "income" ? "receita" : "despesa";
}

function mapFormTypeToBackend(
  type: NewTransactionFormValues["transactionType"],
): string {
  return type === "receita" ? "income" : "outocome";
}

const EMPTY_FORM_VALUES: NewTransactionFormValues = {
  transactionType: "despesa",
  description: "",
  date: undefined,
  amount: "0,00",
  category: "",
};

function buildTransactionFormValues(
  transaction?: EditableTransaction,
): NewTransactionFormValues {
  if (!transaction) {
    return EMPTY_FORM_VALUES;
  }

  const parsedDate = new Date(transaction.date);

  return {
    transactionType: mapBackendTypeToForm(transaction.type),
    description: transaction.description,
    date: Number.isNaN(parsedDate.getTime()) ? undefined : parsedDate,
    amount: formatBrlFromNumber(Math.abs(transaction.value)),
    category: transaction.categoryId,
  };
}

export function NewTransactionModal({
  children,
  transaction,
}: NewTransactionModalProps) {
  const apolloClient = useApolloClient();
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitted },
  } = useNewTransactionForm();

  const [createTransaction, { loading: isCreating }] = useMutation<
    CreateTransactionMutationData,
    CreateTransactionMutationVariables
  >(CREATE_TRANSACTION);
  const [updateTransaction, { loading: isUpdating }] = useMutation<
    UpdateTransactionMutationData,
    UpdateTransactionMutationVariables
  >(UPDATE_TRANSACTION);

  const { data: categoriesData } =
    useQuery<ListCategoriesQueryData>(GET_CATEGORIES);

  const isUpdateMode = Boolean(transaction);
  const isLoading = isCreating || isUpdating;

  const transactionType = watch("transactionType");
  const category = watch("category");
  const amount = watch("amount");
  const date = watch("date");
  const canSubmit = Boolean(date) && Boolean(category);

  function handleAmountChange(value: string) {
    const onlyDigits = value.replace(/\D/g, "");
    setValue("amount", formatBrlFromDigits(onlyDigits), {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
  }

  function handleOpenChange(open: boolean) {
    setIsOpen(open);

    if (open) {
      reset(buildTransactionFormValues(transaction));
      return;
    }

    setDatePickerOpen(false);
    reset(EMPTY_FORM_VALUES);
  }

  async function invalidateTransactionsQueryAndRefetch(): Promise<void> {
    apolloClient.cache.evict({
      id: "ROOT_QUERY",
      fieldName: "listTransactions",
    });
    apolloClient.cache.gc();

    await apolloClient.refetchQueries({
      include: [GET_TRANSACTIONS],
    });
  }

  async function onSubmit(values: NewTransactionFormValues): Promise<void> {
    if (!values.date) {
      return;
    }

    try {
      const dataInput = {
        type: mapFormTypeToBackend(values.transactionType),
        description: values.description.trim(),
        date: values.date,
        value: parseBrlToNumber(values.amount),
        categoryId: values.category,
      };

      if (isUpdateMode && transaction) {
        const { data } = await updateTransaction({
          variables: {
            id: transaction.id,
            data: dataInput,
          },
        });

        if (data?.updateTransaction) {
          await invalidateTransactionsQueryAndRefetch();
          toast.success("Transação atualizada com sucesso!");
          setIsOpen(false);
          reset(EMPTY_FORM_VALUES);
          return;
        }
      } else {
        const { data } = await createTransaction({
          variables: {
            data: dataInput,
          },
        });

        if (data?.createTransaction) {
          await invalidateTransactionsQueryAndRefetch();
          toast.success("Transação criada com sucesso!");
          setIsOpen(false);
          reset(EMPTY_FORM_VALUES);
          return;
        }
      }

      toast.error("Não foi possível salvar a transação.");
    } catch {
      toast.error("Não foi possível salvar a transação.");
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="max-w-[calc(100%-1.5rem)] gap-0 overflow-hidden rounded-2xl border border-gray-200 bg-white p-0 sm:max-w-115"
      >
        <div className="flex items-start justify-between border-b border-gray-200 px-6 py-5">
          <DialogHeader className="gap-1">
            <DialogTitle className="text-xl font-semibold text-gray-800">
              {isUpdateMode ? "Editar transação" : "Nova transação"}
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-500">
              Registre sua despesa ou receita
            </DialogDescription>
          </DialogHeader>

          <DialogClose asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              disabled={isLoading}
              className="cursor-pointer rounded-xl border border-gray-300 text-gray-500 hover:bg-gray-100"
            >
              <X className="size-4" />
              <span className="sr-only">Fechar modal</span>
            </Button>
          </DialogClose>
        </div>

        <form className="space-y-5 px-6 py-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-2 rounded-xl border border-gray-200 bg-gray-50 p-1">
            <button
              type="button"
              disabled={isLoading}
              className={cn(
                "flex h-11 cursor-pointer items-center justify-center gap-2 rounded-lg border text-base font-medium transition-colors",
                transactionType === "despesa"
                  ? "border-red-400 bg-white text-gray-800"
                  : "border-transparent text-gray-500 hover:text-gray-700",
              )}
              onClick={() =>
                setValue("transactionType", "despesa", {
                  shouldDirty: true,
                  shouldTouch: true,
                })
              }
            >
              <ArrowDownCircle className="size-4 text-red-500" />
              <span className="leading-none">Despesa</span>
            </button>

            <button
              type="button"
              disabled={isLoading}
              className={cn(
                "flex h-11 cursor-pointer items-center justify-center gap-2 rounded-lg border text-base font-medium transition-colors",
                transactionType === "receita"
                  ? "border-emerald-500 bg-white text-gray-800"
                  : "border-transparent text-gray-500 hover:text-gray-700",
              )}
              onClick={() =>
                setValue("transactionType", "receita", {
                  shouldDirty: true,
                  shouldTouch: true,
                })
              }
            >
              <ArrowUpCircle className="size-4 text-gray-400" />
              <span className="leading-none">Receita</span>
            </button>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="transaction-description"
              className="text-lg font-medium text-gray-700"
            >
              Descrição
            </Label>
            <Input
              id="transaction-description"
              placeholder="Ex. Almoço no restaurante"
              disabled={isLoading}
              {...register("description")}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="transaction-date"
                className="text-lg font-medium text-gray-700"
              >
                Data
              </Label>
              <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
                <PopoverTrigger asChild>
                  <Button
                    id="transaction-date"
                    type="button"
                    variant="outline"
                    disabled={isLoading}
                    className={cn(
                      "h-12 w-full cursor-pointer justify-between rounded-lg border border-gray-300 bg-white px-3.5 text-left text-base font-normal shadow-none hover:bg-white",
                      isSubmitted && errors.date && "border-destructive",
                      date ? "text-gray-800" : "text-gray-400",
                    )}
                  >
                    {date ? formatDate(date) : "Selecione"}
                    <CalendarDays className="size-4 text-gray-500" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(selectedDate) => {
                      setValue("date", selectedDate, {
                        shouldDirty: true,
                        shouldValidate: true,
                        shouldTouch: true,
                      });
                      setDatePickerOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
              {isSubmitted && errors.date?.message ? (
                <p className="text-sm text-destructive">
                  {errors.date.message}
                </p>
              ) : null}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="transaction-value"
                className="text-lg font-medium text-gray-700"
              >
                Valor
              </Label>
              <div className="flex h-12 items-center gap-2 rounded-lg border border-gray-300 px-3.5 focus-within:border-primary focus-within:shadow-[0_0_0_1px_var(--primary)]">
                <span className="text-base text-gray-700">R$</span>
                <Input
                  id="transaction-value"
                  value={amount}
                  onChange={(event) => handleAmountChange(event.target.value)}
                  inputMode="numeric"
                  disabled={isLoading}
                  className="h-full border-none px-0 py-0 shadow-none focus-visible:border-transparent focus-visible:shadow-none"
                  placeholder="0,00"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="transaction-category"
              className="text-lg font-medium text-gray-700"
            >
              Categoria
            </Label>
            <Select
              value={category}
              onValueChange={(value) =>
                setValue("category", value, {
                  shouldDirty: true,
                  shouldValidate: true,
                  shouldTouch: true,
                })
              }
            >
              <SelectTrigger
                id="transaction-category"
                className={cn(
                  "h-12 w-full cursor-pointer rounded-lg border border-gray-300 bg-white px-3.5 text-base text-gray-500 shadow-none data-placeholder:text-gray-400",
                  isSubmitted && errors.category && "border-destructive",
                )}
              >
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>

              <SelectContent className="overflow-hidden rounded-xl border border-gray-200 bg-white p-0 shadow-lg">
                {(categoriesData?.listCategories ?? []).map((item) => {
                  const iconOption = categoryIconOptions.find(
                    (option) => option.enumValue === item.icon,
                  );
                  const colorOption = categoryColorOptions.find(
                    (option) => option.enumValue === item.color,
                  );
                  const Icon = iconOption?.icon ?? Tag;

                  return (
                    <SelectItem
                      key={item.id}
                      value={item.id}
                      className="cursor-pointer rounded-none px-4 py-3 text-base font-medium text-gray-800 hover:bg-gray-50"
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className={cn(
                            "flex size-5 items-center justify-center rounded-full bg-gray-100",
                            colorOption?.swatch,
                          )}
                        >
                          <Icon className="size-3 text-white" />
                        </span>
                        {item.title}
                      </span>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            {isSubmitted && errors.category?.message ? (
              <p className="text-sm text-destructive">
                {errors.category.message}
              </p>
            ) : null}
          </div>

          <Button
            type="submit"
            disabled={!canSubmit || isLoading}
            className="h-11 w-full cursor-pointer rounded-lg text-base font-medium"
          >
            {isUpdateMode ? "Salvar alterações" : "Salvar"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
