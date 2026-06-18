import { useState, type ReactNode } from "react";
import { useMutation } from "@apollo/client/react";
import { X } from "lucide-react";

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
import { CREATE_CATEGORY } from "@/lib/graphql/mutations/category";
import { GET_CATEGORIES } from "@/lib/graphql/queries/category";
import {
  type CreateCategoryMutationData,
  type CreateCategoryMutationVariables,
  type CreateCategoryOnSubmitParam,
  type CreateCategoryOnSubmitReturn,
} from "@/lib/graphql/types/category";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  categoryColorOptions,
  categoryIconOptions,
  getCategoryColorKeyByValue,
  getCategoryIconKeyByValue,
  isCategoryColorEnumValue,
  isCategoryIconEnumValue,
} from "@/utils/category/category-enums";
import { useCategoryForm } from "../category-form";

type NewCategoryModalProps = {
  children: ReactNode;
};

export function NewCategoryModal({ children }: NewCategoryModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useCategoryForm();

  const [createCategory, { loading }] = useMutation<
    CreateCategoryMutationData,
    CreateCategoryMutationVariables
  >(CREATE_CATEGORY);

  const selectedColor = watch("color");
  const selectedIcon = watch("icon");
  const selectedColorKey = getCategoryColorKeyByValue(selectedColor) ?? null;
  const selectedIconKey = getCategoryIconKeyByValue(selectedIcon) ?? null;

  function handleOpenChange(open: boolean) {
    setIsOpen(open);

    if (!open) {
      reset();
    }
  }

  async function onSubmit(
    values: CreateCategoryOnSubmitParam,
  ): CreateCategoryOnSubmitReturn {
    if (
      !isCategoryIconEnumValue(values.icon) ||
      !isCategoryColorEnumValue(values.color)
    ) {
      toast.error("Selecione um ícone e uma cor válidos.");
      return;
    }

    try {
      const description = values.description?.trim();
      const { data } = await createCategory({
        variables: {
          data: {
            title: values.title.trim(),
            description: description || undefined,
            icon: values.icon,
            color: values.color,
          },
        },
        refetchQueries: [{ query: GET_CATEGORIES }],
        awaitRefetchQueries: true,
      });

      if (data?.createCategory) {
        toast.success("Categoria criada com sucesso!");
        reset();
        setIsOpen(false);
        return;
      }

      toast.error("Não foi possível criar a categoria.");
    } catch {
      toast.error("Não foi possível criar a categoria.");
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
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
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
              {...register("description")}
            />
            <p className="text-xs text-gray-500">Opcional</p>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Ícone</Label>
            <input type="hidden" {...register("icon")} />
            <div className="grid w-full grid-cols-8 gap-2">
              {categoryIconOptions.map(({ enumKey, enumValue, icon: Icon }) => (
                <Button
                  key={enumKey}
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  disabled={loading}
                  className={cn(
                    "size-10.5 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50",
                    selectedIconKey === enumKey &&
                      "border-primary bg-primary/10 text-primary",
                  )}
                  onClick={() =>
                    setValue("icon", enumValue, {
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
              {categoryColorOptions.map((option) => (
                <button
                  key={option.enumKey}
                  type="button"
                  aria-label={option.label}
                  disabled={loading}
                  onClick={() =>
                    setValue("color", option.enumValue, {
                      shouldDirty: true,
                      shouldValidate: true,
                      shouldTouch: true,
                    })
                  }
                  className={cn(
                    "h-6 w-full rounded-md border border-gray-300",
                    option.swatch,
                    selectedColorKey === option.enumKey &&
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
            disabled={loading}
            className="h-11 w-full rounded-lg text-base font-medium"
          >
            Salvar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
