import { useState } from "react";
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
import {
  EyeClosedIcon,
  EyeIcon,
  LockIcon,
  MailIcon,
  UserRoundPlus,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Controller } from "react-hook-form";
import { type SigninFormValues, useSigninForm } from "./signin-form";
import { persistAuthSession } from "@/lib/auth";

export function Signin() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useSigninForm();

  function onSubmit(_data: SigninFormValues) {
    persistAuthSession();
    navigate("/dashboard");
  }

  return (
    <div className="flex flex-col items-center justify-center gap-8 p-12">
      <img src={logo} className="w-33.5 h-8" />
      <Card className="w-full max-w-md rounded-xl bg-white p-8 border-gray-200 border gap-0">
        <CardHeader className="gap-1 p-0 mb-8">
          <CardTitle className="text-xl font-bold justify-self-center">
            Fazer login
          </CardTitle>
          <CardDescription className="text-base text-gray-600 justify-self-center">
            Entre na sua conta para continuar
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="contents">
          <CardContent className="p-0 mb-6">
            <FieldGroup className="gap-4">
              <Field className="gap-2!">
                <FieldLabel
                  className={
                    errors.email
                      ? "text-destructive font-medium"
                      : "text-gray-700 font-medium"
                  }
                  htmlFor="fieldgroup-email"
                >
                  E-mail
                </FieldLabel>
                <InputGroup className="border-gray-300">
                  <InputGroupInput
                    className="placeholder:text-gray-400"
                    id="fieldgroup-email"
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
                  htmlFor="fieldgroup-password"
                >
                  Senha
                </FieldLabel>
                <InputGroup className="border-gray-300">
                  <InputGroupInput
                    type={isPasswordVisible ? "text" : "password"}
                    className="placeholder:text-gray-400"
                    id="fieldgroup-password"
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
                      title="Change Password visibility"
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
                ) : null}
              </Field>
              <div className="flex flex-row justify-between gap-4">
                <Field orientation="horizontal">
                  <Controller
                    name="rememberData"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        className="data-[state=checked]:bg-primary data-[state=checked]:text-white"
                        id="remember-data-checkbox"
                        name={field.name}
                        checked={field.value}
                        onBlur={field.onBlur}
                        onCheckedChange={(checked) =>
                          field.onChange(Boolean(checked))
                        }
                      />
                    )}
                  />
                  <FieldLabel
                    className="text-gray-700 font-normal"
                    htmlFor="remember-data-checkbox"
                  >
                    Lembrar-me
                  </FieldLabel>
                </Field>
                <Button variant="link" asChild>
                  <Link to="/forgot-passwork">Recuperar senha</Link>
                </Button>
              </div>
            </FieldGroup>
          </CardContent>
          <CardFooter className="flex flex-col p-0 gap-6">
            <Button className="w-full" size="lg" type="submit">
              Entrar
            </Button>
            <div className="flex flex-row items-center w-full gap-3">
              <div className="h-px w-full bg-gray-200" />
              <span className="text-gray-500 text-sm">ou</span>
              <div className="h-px w-full bg-gray-200" />
            </div>
            <div className="flex flex-col w-full gap-4">
              <span className="text-gray-600 text-sm text-center">
                Ainda não tem uma conta?
              </span>
              <Button variant="outline" size="lg" asChild>
                <Link to="/signup">
                  <UserRoundPlus /> Criar conta
                </Link>
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
