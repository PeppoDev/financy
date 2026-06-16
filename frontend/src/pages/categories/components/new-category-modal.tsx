import type { ReactNode } from "react";
import {
  BriefcaseBusiness,
  CarFront,
  HeartPulse,
  PiggyBank,
  ShoppingCart,
  Ticket,
  X,
  ToolCase,
  type LucideIcon,
  Utensils,
  PawPrint,
  House,
  Gift,
  Dumbbell,
  BookOpen,
  BaggageClaim,
  Mailbox,
  ReceiptText,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useCategoryForm, type CategoryFormValues } from "../category-form";

type NewCategoryModalProps = {
  children: ReactNode;
};

const colorOptions = [
  { label: "Verde", value: "green", swatch: "bg-emerald-600" },
  { label: "Azul", value: "blue", swatch: "bg-blue-600" },
  { label: "Roxo", value: "purple", swatch: "bg-violet-600" },
  { label: "Rosa", value: "pink", swatch: "bg-pink-600" },
  { label: "Vermelho", value: "red", swatch: "bg-red-600" },
  { label: "Laranja", value: "orange", swatch: "bg-orange-600" },
  { label: "Amarelo", value: "yellow", swatch: "bg-amber-600" },
];

const iconOptions: Array<{ value: string; icon: LucideIcon }> = [
  { value: "briefcase", icon: BriefcaseBusiness },
  { value: "car", icon: CarFront },
  { value: "heart", icon: HeartPulse },
  { value: "piggy-bank", icon: PiggyBank },
  { value: "shopping-cart", icon: ShoppingCart },
  { value: "ticket", icon: Ticket },
  { value: "tool-case", icon: ToolCase },
  { value: "utensils", icon: Utensils },
  { value: "paw-print", icon: PawPrint },
  { value: "house", icon: House },
  { value: "gift", icon: Gift },
  { value: "dumbbell", icon: Dumbbell },
  { value: "book-open", icon: BookOpen },
  { value: "baggage-claim", icon: BaggageClaim },
  { value: "mailbox", icon: Mailbox },
  { value: "receipt-text", icon: ReceiptText },
];

export function NewCategoryModal({ children }: NewCategoryModalProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useCategoryForm();

  const selectedColor = watch("color");
  const selectedIcon = watch("icon");

  function onSubmit(_values: CategoryFormValues) {
    // Enquanto o backend nao estiver pronto, o submit permanece apenas visual.
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="max-w-[calc(100%-1.5rem)] gap-0 overflow-hidden rounded-2xl border border-gray-200 bg-white p-0 sm:max-w-md"
      >
        <div className="flex items-start justify-between px-6 py-5">
          <DialogHeader className="gap-1">
            <DialogTitle className="text-xl font-semibold text-gray-800">
              Nova categoria
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-500">
              Organize suas transações com categorias
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

        <form className="space-y-5 px-6 pb-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label
              htmlFor="category-title"
              className="text-sm font-medium text-gray-700"
            >
              Título
            </Label>
            <Input
              id="category-title"
              placeholder="Ex. Alimentação"
              {...register("title")}
            />
            {errors.title ? (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="category-description"
              className="text-sm font-medium text-gray-700"
            >
              Descrição
            </Label>
            <Input
              id="category-description"
              placeholder="Descrição da categoria"
              {...register("description")}
            />
            <p className="text-xs text-gray-500">Opcional</p>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Ícone</Label>
            <input type="hidden" {...register("icon")} />
            <div className="grid w-full grid-cols-8 gap-2">
              {iconOptions.map(({ value, icon: Icon }) => (
                <Button
                  key={value}
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  className={cn(
                    "size-10.5 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50",
                    selectedIcon === value &&
                      "border-primary bg-primary/10 text-primary",
                  )}
                  onClick={() =>
                    setValue("icon", value, {
                      shouldDirty: true,
                      shouldValidate: true,
                      shouldTouch: true,
                    })
                  }
                >
                  <Icon className="size-5" />
                </Button>
              ))}
            </div>
            {errors.icon ? (
              <p className="text-sm text-destructive">{errors.icon.message}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="category-color"
              className="text-sm font-medium text-gray-700"
            >
              Cor
            </Label>
            <input id="category-color" type="hidden" {...register("color")} />
            <div className="grid grid-cols-7 gap-2">
              {colorOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  aria-label={option.label}
                  onClick={() =>
                    setValue("color", option.value, {
                      shouldDirty: true,
                      shouldValidate: true,
                      shouldTouch: true,
                    })
                  }
                  className={cn(
                    "h-6 w-full rounded-md border border-gray-300",
                    option.swatch,
                    selectedColor === option.value &&
                      "ring-2 ring-offset-1 ring-primary",
                  )}
                />
              ))}
            </div>
            {errors.color ? (
              <p className="text-sm text-destructive">{errors.color.message}</p>
            ) : null}
          </div>

          <Button
            type="submit"
            className="h-11 w-full rounded-lg text-base font-medium"
          >
            Salvar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
