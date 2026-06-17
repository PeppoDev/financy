import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  EyeClosedIcon,
  EyeIcon,
  LockIcon,
  LogInIcon,
  MailIcon,
  UserIcon,
} from "lucide-react";

import logo from "@/assets/logo.svg";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { type SignupFormValues, useSignupForm } from "./signup-form";
import { apolloClient } from "@/lib/graphql/client";
import { CREATE_USER } from "@/lib/graphql/mutations/user";
import { toast } from "sonner";

export function Signup() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useSignupForm();

  async function onSubmit(data: SignupFormValues) {
    setIsLoading(true);
    try {
      const { data: mutationData } = await apolloClient.mutate<
        { createUser: { id: string; email: string; name: string } },
        { data: { name: string; email: string; password: string } }
      >({
        mutation: CREATE_USER,
        variables: {
          data: {
            name: data.fullName,
            email: data.email,
            password: data.password,
          },
        },
      });

      if (mutationData?.createUser) {
        toast.success("Conta criada com sucesso!");
        navigate("/signin");
        return;
      }

      toast.error("Nao foi possivel criar sua conta.");
    } catch {
      toast.error("Falha ao criar conta.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-8 p-12">
      <img src={logo} className="w-33.5 h-8" />

      <Card className="w-full max-w-md rounded-xl bg-white p-8 border-gray-200 border gap-0">
        <CardHeader className="gap-1 p-0 mb-8">
          <CardTitle className="text-xl font-bold justify-self-center">
            Criar conta
          </CardTitle>
          <CardDescription className="text-base text-gray-600 justify-self-center text-center">
            Comece a controlar suas financas ainda hoje
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="contents">
          <CardContent className="p-0 mb-6">
            <FieldGroup className="gap-4">
              <Field className="gap-2!">
                <FieldLabel
                  className={
                    errors.fullName
                      ? "text-destructive font-medium"
                      : "text-gray-700 font-medium"
                  }
                  htmlFor="fieldgroup-fullname"
                >
                  Nome completo
                </FieldLabel>
                <InputGroup className="border-gray-300">
                  <InputGroupInput
                    id="fieldgroup-fullname"
                    className="placeholder:text-gray-400"
                    placeholder="Seu nome completo"
                    aria-invalid={Boolean(errors.fullName)}
                    {...register("fullName")}
                  />
                  <InputGroupAddon align="inline-start">
                    <UserIcon className="text-gray-400" />
                  </InputGroupAddon>
                </InputGroup>
                {errors.fullName ? (
                  <span className="text-sm text-destructive">
                    {errors.fullName.message}
                  </span>
                ) : null}
              </Field>

              <Field className="gap-2!">
                <FieldLabel
                  className={
                    errors.email
                      ? "text-destructive font-medium"
                      : "text-gray-700 font-medium"
                  }
                  htmlFor="fieldgroup-email-signup"
                >
                  E-mail
                </FieldLabel>
                <InputGroup className="border-gray-300">
                  <InputGroupInput
                    id="fieldgroup-email-signup"
                    className="placeholder:text-gray-400"
                    placeholder="mail@exemplo.com"
                    aria-invalid={Boolean(errors.email)}
                    {...register("email")}
                  />
                  <InputGroupAddon align="inline-start">
                    <MailIcon className="text-gray-400" />
                  </InputGroupAddon>
                </InputGroup>
                {errors.email ? (
                  <span className="text-sm text-destructive">
                    {errors.email.message}
                  </span>
                ) : null}
              </Field>

              <Field className="gap-2!">
                <FieldLabel
                  className={
                    errors.password
                      ? "text-destructive font-medium"
                      : "text-gray-700 font-medium"
                  }
                  htmlFor="fieldgroup-password-signup"
                >
                  Senha
                </FieldLabel>
                <InputGroup className="border-gray-300">
                  <InputGroupInput
                    id="fieldgroup-password-signup"
                    type={isPasswordVisible ? "text" : "password"}
                    className="placeholder:text-gray-400"
                    placeholder="Digite sua senha"
                    aria-invalid={Boolean(errors.password)}
                    {...register("password")}
                  />
                  <InputGroupAddon align="inline-start">
                    <LockIcon className="text-gray-400" />
                  </InputGroupAddon>
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      aria-label="Change password visibility"
                      title="Change password visibility"
                      disabled={isLoading}
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    >
                      {isPasswordVisible ? <EyeIcon /> : <EyeClosedIcon />}
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
                {errors.password ? (
                  <span className="text-sm text-destructive">
                    {errors.password.message}
                  </span>
                ) : (
                  <span className="text-sm text-gray-500">
                    A senha deve ter no minimo 8 caracteres
                  </span>
                )}
              </Field>
            </FieldGroup>
          </CardContent>

          <CardFooter className="flex flex-col p-0 gap-6">
            <Button className="w-full" size="lg" type="submit" disabled={isLoading}>
              Cadastrar
            </Button>

            <div className="flex flex-row items-center w-full gap-3">
              <div className="h-px w-full bg-gray-200" />
              <span className="text-gray-500 text-sm">ou</span>
              <div className="h-px w-full bg-gray-200" />
            </div>

            <div className="flex flex-col w-full gap-4">
              <span className="text-gray-600 text-sm text-center">
                Ja tem uma conta?
              </span>
              <Button variant="outline" size="lg" asChild>
                <Link to="/signin">
                  <LogInIcon /> Fazer login
                </Link>
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
