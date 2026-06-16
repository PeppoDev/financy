import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const signupSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Informe seu nome completo")
    .min(3, "Nome completo deve ter no minimo 3 caracteres"),
  email: z
    .string()
    .min(1, "Informe o e-mail")
    .email("Informe um e-mail valido"),
  password: z
    .string()
    .min(1, "Informe a senha")
    .min(8, "A senha deve ter no minimo 8 caracteres"),
});

export type SignupFormValues = z.infer<typeof signupSchema>;

export function useSignupForm() {
  return useForm<SignupFormValues>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });
}
