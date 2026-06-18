import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type TransactionsFiltersProps = {
  searchValue: string;
  onSearchChange: (value: string) => void;
  typeValue: string;
  onTypeChange: (value: string) => void;
  categoryValue: string;
  onCategoryChange: (value: string) => void;
  periodValue: string;
  onPeriodChange: (value: string) => void;
  categoryOptions: Array<{ value: string; label: string }>;
  periodOptions: Array<{ value: string; label: string }>;
};

export function TransactionsFilters({
  searchValue,
  onSearchChange,
  typeValue,
  onTypeChange,
  categoryValue,
  onCategoryChange,
  periodValue,
  onPeriodChange,
  categoryOptions,
  periodOptions,
}: TransactionsFiltersProps) {
  return (
    <div className="grid gap-3 rounded-xl border border-gray-200 p-3 md:grid-cols-4">
      <div className="space-y-1">
        <span className="text-xs font-medium text-gray-500">Buscar</span>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
          <Input
            value={searchValue}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Buscar por descrição"
            className="h-11 pl-9"
          />
        </div>
      </div>

      <div className="space-y-1">
        <span className="text-xs font-medium text-gray-500">Tipo</span>
        <Select value={typeValue} onValueChange={onTypeChange}>
          <SelectTrigger className="h-11 w-full cursor-pointer rounded-lg border border-gray-300 px-3 text-sm text-gray-700 shadow-none">
            <SelectValue placeholder="Todos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="entrada">Entrada</SelectItem>
            <SelectItem value="saida">Saída</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1">
        <span className="text-xs font-medium text-gray-500">Categoria</span>
        <Select value={categoryValue} onValueChange={onCategoryChange}>
          <SelectTrigger className="h-11 w-full cursor-pointer rounded-lg border border-gray-300 px-3 text-sm text-gray-700 shadow-none">
            <SelectValue placeholder="Todas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            {categoryOptions.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1">
        <span className="text-xs font-medium text-gray-500">Período</span>
        <Select value={periodValue} onValueChange={onPeriodChange}>
          <SelectTrigger className="h-11 w-full cursor-pointer rounded-lg border border-gray-300 px-3 text-sm text-gray-700 shadow-none">
            <SelectValue placeholder="Todos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            {periodOptions.map((period) => (
              <SelectItem key={period.value} value={period.value}>
                {period.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
