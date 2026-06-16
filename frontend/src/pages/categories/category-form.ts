import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const categorySchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Informe o nome da categoria")
    .min(3, "Categoria deve ter no minimo 3 caracteres"),
  description: z.string().trim().optional(),
  icon: z.string().min(1, "Selecione um icone"),
  color: z.string().min(1, "Selecione uma cor"),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;

export function useCategoryForm() {
  return useForm<CategoryFormValues>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: zodResolver(categorySchema),
    defaultValues: {
      title: "",
      description: "",
      icon: "",
      color: "",
    },
  });
}
