import { useState, type ReactNode } from "react";
import { ArrowDownCircle, ArrowUpCircle, CalendarDays, X } from "lucide-react";

import { categoriesMap, type CategoryKey } from "@/lib/categories";
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
import { cn } from "@/lib/utils";
import {
  formatBrlFromDigits,
  useNewTransactionForm,
} from "../new-transaction-form";

type NewTransactionModalProps = {
  children: ReactNode;
};

const categories = Object.values(categoriesMap);

function formatDate(date: Date) {
  return date.toLocaleDateString("pt-BR");
}

export function NewTransactionModal({ children }: NewTransactionModalProps) {
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitted },
  } = useNewTransactionForm();

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

  const onSubmit = handleSubmit(() => undefined);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="max-w-[calc(100%-1.5rem)] gap-0 overflow-hidden rounded-2xl border border-gray-200 bg-white p-0 sm:max-w-115"
      >
        <div className="flex items-start justify-between border-b border-gray-200 px-6 py-5">
          <DialogHeader className="gap-1">
            <DialogTitle className="text-xl font-semibold text-gray-800">
              Nova transação
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-500">
              Registre sua despesa ou receita
            </DialogDescription>
          </DialogHeader>

          <DialogClose asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              className="rounded-xl border border-gray-300 text-gray-500 hover:bg-gray-100"
            >
              <X className="size-4" />
              <span className="sr-only">Fechar modal</span>
            </Button>
          </DialogClose>
        </div>

        <form className="space-y-5 px-6 py-5" onSubmit={onSubmit}>
          <div className="grid grid-cols-2 gap-2 rounded-xl border border-gray-200 bg-gray-50 p-1">
            <button
              type="button"
              className={cn(
                "flex h-11 items-center justify-center gap-2 rounded-lg border text-base font-medium transition-colors",
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
              className={cn(
                "flex h-11 items-center justify-center gap-2 rounded-lg border text-base font-medium transition-colors",
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
              Descricao
            </Label>
            <Input
              id="transaction-description"
              placeholder="Ex. Almoco no restaurante"
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
                    className={cn(
                      "h-12 w-full justify-between rounded-lg border border-gray-300 bg-white px-3.5 text-left text-base font-normal shadow-none hover:bg-white",
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
                setValue("category", value as CategoryKey, {
                  shouldDirty: true,
                  shouldValidate: true,
                  shouldTouch: true,
                })
              }
            >
              <SelectTrigger
                id="transaction-category"
                className={cn(
                  "h-12 w-full rounded-lg border border-gray-300 bg-white px-3.5 text-base text-gray-500 shadow-none data-placeholder:text-gray-400",
                  isSubmitted && errors.category && "border-destructive",
                )}
              >
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>

              <SelectContent className="overflow-hidden rounded-xl border border-gray-200 bg-white p-0 shadow-lg">
                {categories.map((item) => {
                  const Icon = item.icon;

                  return (
                    <SelectItem
                      key={item.key}
                      value={item.key}
                      className="rounded-none px-4 py-3 text-base font-medium text-gray-800 hover:bg-gray-50"
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className={cn(
                            "flex size-5 items-center justify-center rounded-full",
                            item.iconContainerClassName,
                          )}
                        >
                          <Icon className={cn("size-3", item.iconClassName)} />
                        </span>
                        {item.label}
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
            disabled={!canSubmit}
            className="h-11 w-full rounded-lg text-base font-medium"
          >
            Salvar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
