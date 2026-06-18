import { useState, type ReactNode } from "react";
import { useApolloClient, useMutation } from "@apollo/client/react";
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
import {
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
} from "@/lib/graphql/mutations/category";
import { GET_CATEGORIES } from "@/lib/graphql/queries/category";
import {
  type CreateCategoryMutationData,
  type CreateCategoryMutationVariables,
  type CreateCategoryOnSubmitParam,
  type CreateCategoryOnSubmitReturn,
  type UpdateCategoryMutationData,
  type UpdateCategoryMutationVariables,
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

type EditableCategory = {
  id: string;
  title: string;
  color: string;
  icon: string;
  description?: string | null;
};

type NewCategoryModalProps = {
  children: ReactNode;
  category?: EditableCategory;
};

const EMPTY_FORM_VALUES: CreateCategoryOnSubmitParam = {
  title: "",
  description: "",
  icon: "",
  color: "",
};

function buildFormValues(
  category?: EditableCategory,
): CreateCategoryOnSubmitParam {
  if (!category) {
    return EMPTY_FORM_VALUES;
  }

  return {
    title: category.title,
    description: category.description?.trim() ?? "",
    icon: isCategoryIconEnumValue(category.icon) ? category.icon : "",
    color: isCategoryColorEnumValue(category.color) ? category.color : "",
  };
}

export function NewCategoryModal({
  children,
  category,
}: NewCategoryModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useCategoryForm();

  const apolloClient = useApolloClient();

  const [createCategory, { loading: isCreating }] = useMutation<
    CreateCategoryMutationData,
    CreateCategoryMutationVariables
  >(CREATE_CATEGORY);
  const [updateCategory, { loading: isUpdating }] = useMutation<
    UpdateCategoryMutationData,
    UpdateCategoryMutationVariables
  >(UPDATE_CATEGORY);

  const isUpdateMode = Boolean(category);
  const isLoading = isCreating || isUpdating;

  const selectedColor = watch("color");
  const selectedIcon = watch("icon");
  const selectedColorKey = getCategoryColorKeyByValue(selectedColor) ?? null;
  const selectedIconKey = getCategoryIconKeyByValue(selectedIcon) ?? null;

  function handleOpenChange(open: boolean) {
    setIsOpen(open);

    if (open) {
      reset(buildFormValues(category));
      return;
    }

    reset(EMPTY_FORM_VALUES);
  }

  async function invalidateCategoriesQueryAndRefetch(): Promise<void> {
    apolloClient.cache.evict({
      id: "ROOT_QUERY",
      fieldName: "listCategories",
    });
    apolloClient.cache.gc();

    await apolloClient.refetchQueries({
      include: [GET_CATEGORIES],
    });
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
      const dataInput = {
        title: values.title.trim(),
        description: description || undefined,
        icon: values.icon,
        color: values.color,
      };

      if (isUpdateMode && category) {
        const { data } = await updateCategory({
          variables: {
            id: category.id,
            data: dataInput,
          },
        });

        if (data?.updateCategory) {
          await invalidateCategoriesQueryAndRefetch();
          toast.success("Categoria atualizada com sucesso!");
          setIsOpen(false);
          reset(EMPTY_FORM_VALUES);
          return;
        }
      } else {
        const { data } = await createCategory({
          variables: {
            data: dataInput,
          },
        });

        if (data?.createCategory) {
          await invalidateCategoriesQueryAndRefetch();
          toast.success("Categoria criada com sucesso!");
          setIsOpen(false);
          reset(EMPTY_FORM_VALUES);
          return;
        }
      }

      toast.error("Não foi possível salvar a categoria.");
    } catch {
      toast.error("Não foi possível salvar a categoria.");
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
              {isUpdateMode ? "Editar categoria" : "Nova categoria"}
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-500">
              Organize suas transações com categorias
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
              disabled={isLoading}
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
              disabled={isLoading}
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
                  disabled={isLoading}
                  className={cn(
                    "size-10.5 cursor-pointer rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50",
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
                  disabled={isLoading}
                  onClick={() =>
                    setValue("color", option.enumValue, {
                      shouldDirty: true,
                      shouldValidate: true,
                      shouldTouch: true,
                    })
                  }
                  className={cn(
                    "h-6 w-full cursor-pointer rounded-md border border-gray-300",
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
            disabled={isLoading}
            className="h-11 w-full cursor-pointer rounded-lg text-base font-medium"
          >
            {isUpdateMode ? "Salvar alterações" : "Salvar"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
