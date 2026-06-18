import { useMutation } from "@apollo/client/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogOutIcon, MailIcon, UserIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

import defaultAvatar from "@/assets/default-avatar.svg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { UPDATE_USER } from "@/lib/graphql/mutations/user";
import {
  type UpdateUserMutationData,
  type UpdateUserMutationVariables,
} from "@/lib/graphql/types/user";
import { useAuthStore } from "@/stores/auth";

const updateUserFormSchema = z.object({
  name: z.string().trim().min(1, "O nome e obrigatorio"),
});

type UpdateUserFormValues = z.infer<typeof updateUserFormSchema>;

type AccountOnSubmitParam = UpdateUserFormValues;

type AccountOnSubmitReturn = Promise<void>;

export function Account() {
  const navigate = useNavigate();
  const { user, logout, setUser } = useAuthStore();
  const email = user?.email ?? "";
  const name = user?.name ?? "";

  const [updateUser, { loading }] = useMutation<
    UpdateUserMutationData,
    UpdateUserMutationVariables
  >(UPDATE_USER);

  const { register, handleSubmit } = useForm<UpdateUserFormValues>({
    resolver: zodResolver(updateUserFormSchema),
    defaultValues: {
      name,
    },
  });

  async function onSubmit(data: AccountOnSubmitParam): AccountOnSubmitReturn {
    if (!user) {
      toast.error("Usuario nao autenticado.");
      return;
    }

    try {
      const { data: mutationData } = await updateUser({
        variables: {
          data: {
            name: data.name,
          },
        },
      });

      if (mutationData?.updateUser) {
        setUser(mutationData.updateUser);
        toast.success("Nome atualizado com sucesso!");
        return;
      }

      toast.error("Nao foi possivel atualizar o nome.");
    } catch {
      toast.error("Nao foi possivel atualizar o nome.");
    }
  }

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <section className="mx-auto flex w-full max-w-md justify-center py-10 lg:py-16">
      <div className="w-full rounded-2xl border border-gray-200 bg-white px-7 py-8 shadow-sm">
        <div className="mb-7 flex flex-col items-center text-center">
          <Avatar className="mb-5 h-14 w-14 bg-gray-300 text-xl font-medium text-gray-700">
            <AvatarImage src={defaultAvatar} alt="Avatar padrão" />
            <AvatarFallback className="bg-gray-300 text-gray-700">
              US
            </AvatarFallback>
          </Avatar>
          <h1 className="text-3xl font-semibold text-gray-900">{name}</h1>
          <p className="mt-1 text-lg text-gray-500">{email}</p>
        </div>

        <div className="mb-7 h-px w-full bg-gray-200" />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                {...register("name")}
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

          <Button
            size="lg"
            type="submit"
            disabled={loading}
            className="h-12 w-full text-base font-semibold"
          >
            Salvar alteracoes
          </Button>

          <Button
            variant="outline"
            size="lg"
            type="button"
            onClick={handleLogout}
            className="h-12 w-full text-base font-medium text-gray-700"
          >
            <LogOutIcon className="h-4 w-4 text-red-500" />
            Sair da conta
          </Button>
        </form>
      </div>
    </section>
  );
}
