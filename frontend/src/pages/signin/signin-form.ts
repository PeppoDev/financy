import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const signinSchema = z.object({
  email: z.email("Informe um e-mail válido").min(1, "Informe o e-mail"),
  password: z
    .string()
    .min(1, "Informe a senha")
    .min(8, "A senha deve ter no minimo 8 caracteres"),
  rememberData: z.boolean(),
});

export type SigninFormValues = z.infer<typeof signinSchema>;

export function useSigninForm() {
  return useForm<SigninFormValues>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberData: false,
    },
  });
}
