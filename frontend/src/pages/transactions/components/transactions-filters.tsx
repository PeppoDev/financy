import { Search } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categoriesMap } from "@/lib/categories";

const categories = Object.values(categoriesMap);

export function TransactionsFilters() {
  return (
    <div className="grid gap-3 rounded-xl border border-gray-200 p-3 md:grid-cols-4">
      <div className="space-y-1">
        <span className="text-xs font-medium text-gray-500">Buscar</span>
        <div className="flex h-11 items-center gap-2 rounded-lg border border-gray-300 px-3 text-gray-400">
          <Search className="size-4" />
          <span className="text-sm">Buscar por descricao</span>
        </div>
      </div>

      <div className="space-y-1">
        <span className="text-xs font-medium text-gray-500">Tipo</span>
        <Select>
          <SelectTrigger className="h-11 w-full rounded-lg border border-gray-300 px-3 text-sm text-gray-700 shadow-none">
            <SelectValue placeholder="Todos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="entrada">Entrada</SelectItem>
            <SelectItem value="saida">Saida</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1">
        <span className="text-xs font-medium text-gray-500">Categoria</span>
        <Select>
          <SelectTrigger className="h-11 w-full rounded-lg border border-gray-300 px-3 text-sm text-gray-700 shadow-none">
            <SelectValue placeholder="Todas" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.key} value={category.key}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1">
        <span className="text-xs font-medium text-gray-500">Periodo</span>
        <Select>
          <SelectTrigger className="h-11 w-full rounded-lg border border-gray-300 px-3 text-sm text-gray-700 shadow-none">
            <SelectValue placeholder="Novembro / 2025" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="11/2025">Novembro / 2025</SelectItem>
            <SelectItem value="10/2025">Outubro / 2025</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
