import { LogOutIcon, MailIcon, UserIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useAuthStore } from "@/stores/auth";
import { useNavigate } from "react-router-dom";

export function Account() {
  const navigate = useNavigate();
  const {
    logout,
    user: { email, name },
  } = useAuthStore();

  function handleLogout() {
    console.log("chamou");
    logout();
    navigate("/");
  }

  return (
    <section className="mx-auto flex w-full max-w-md justify-center py-10 lg:py-16">
      <div className="w-full rounded-2xl border border-gray-200 bg-white px-7 py-8 shadow-sm">
        <div className="mb-7 flex flex-col items-center text-center">
          <Avatar className="mb-5 h-14 w-14 bg-gray-300 text-xl font-medium text-gray-700">
            <AvatarFallback className="bg-gray-300 text-gray-700">
              CT
            </AvatarFallback>
          </Avatar>
          <h1 className="text-3xl font-semibold text-gray-900">{name}</h1>
          <p className="mt-1 text-lg text-gray-500">{email}</p>
        </div>

        <div className="mb-7 h-px w-full bg-gray-200" />

        <div className="space-y-6">
          <div>
            <label
              className="mb-2 block text-base font-medium text-gray-700"
              htmlFor="account-name"
            >
              Nome completo
            </label>
            <InputGroup className="h-12 border-gray-300">
              <InputGroupInput
                id="account-name"
                defaultValue={name}
                className="text-base text-gray-700"
              />
              <InputGroupAddon align="inline-start">
                <UserIcon className="h-4 w-4 text-gray-500" />
              </InputGroupAddon>
            </InputGroup>
          </div>

          <div>
            <label
              className="mb-2 block text-base font-medium text-gray-700"
              htmlFor="account-email"
            >
              E-mail
            </label>
            <InputGroup className="h-12 border-gray-300 bg-gray-50">
              <InputGroupInput
                id="account-email"
                defaultValue={email}
                disabled
                className="text-base text-gray-500"
              />
              <InputGroupAddon align="inline-start">
                <MailIcon className="h-4 w-4 text-gray-500" />
              </InputGroupAddon>
            </InputGroup>
            <p className="mt-2 text-sm text-gray-500">
              O e-mail nao pode ser alterado
            </p>
          </div>

          <Button size="lg" className="h-12 w-full text-base font-semibold">
            Salvar alteracoes
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={handleLogout}
            className="h-12 w-full text-base font-medium text-gray-700"
          >
            <LogOutIcon className="h-4 w-4 text-red-500" />
            Sair da conta
          </Button>
        </div>
      </div>
    </section>
  );
}
