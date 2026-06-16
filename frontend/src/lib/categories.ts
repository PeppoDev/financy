import {
  BriefcaseBusiness,
  CarFront,
  HeartPulse,
  PiggyBank,
  Receipt,
  ShoppingCart,
  Ticket,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";

export type CategoryKey =
  | "alimentacao"
  | "entretenimento"
  | "investimento"
  | "mercado"
  | "salario"
  | "saude"
  | "transporte"
  | "utilidades";

export type CategoryMeta = {
  key: CategoryKey;
  label: string;
  icon: LucideIcon;
  badgeClassName: string;
  iconContainerClassName: string;
  iconClassName: string;
};

export const categoriesMap: Record<CategoryKey, CategoryMeta> = {
  alimentacao: {
    key: "alimentacao",
    label: "Alimentacao",
    icon: UtensilsCrossed,
    badgeClassName: "bg-blue-100 text-blue-700",
    iconContainerClassName: "bg-blue-100",
    iconClassName: "text-blue-700",
  },
  entretenimento: {
    key: "entretenimento",
    label: "Entretenimento",
    icon: Ticket,
    badgeClassName: "bg-pink-100 text-pink-700",
    iconContainerClassName: "bg-pink-100",
    iconClassName: "text-pink-700",
  },
  investimento: {
    key: "investimento",
    label: "Investimento",
    icon: PiggyBank,
    badgeClassName: "bg-emerald-100 text-emerald-700",
    iconContainerClassName: "bg-emerald-100",
    iconClassName: "text-emerald-700",
  },
  mercado: {
    key: "mercado",
    label: "Mercado",
    icon: ShoppingCart,
    badgeClassName: "bg-orange-100 text-orange-700",
    iconContainerClassName: "bg-orange-100",
    iconClassName: "text-orange-700",
  },
  salario: {
    key: "salario",
    label: "Salario",
    icon: BriefcaseBusiness,
    badgeClassName: "bg-emerald-100 text-emerald-700",
    iconContainerClassName: "bg-emerald-100",
    iconClassName: "text-emerald-700",
  },
  saude: {
    key: "saude",
    label: "Saude",
    icon: HeartPulse,
    badgeClassName: "bg-red-100 text-red-700",
    iconContainerClassName: "bg-red-100",
    iconClassName: "text-red-700",
  },
  transporte: {
    key: "transporte",
    label: "Transporte",
    icon: CarFront,
    badgeClassName: "bg-violet-100 text-violet-700",
    iconContainerClassName: "bg-violet-100",
    iconClassName: "text-violet-700",
  },
  utilidades: {
    key: "utilidades",
    label: "Utilidades",
    icon: Receipt,
    badgeClassName: "bg-amber-100 text-amber-700",
    iconContainerClassName: "bg-amber-100",
    iconClassName: "text-amber-700",
  },
};

const categoryAliases: Record<string, CategoryKey> = {
  alimentacao: "alimentacao",
  entretenimento: "entretenimento",
  investimento: "investimento",
  mercado: "mercado",
  receita: "salario",
  salario: "salario",
  saude: "saude",
  transporte: "transporte",
  utilidades: "utilidades",
};

function normalizeCategoryName(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function getCategoryKey(value: string): CategoryKey | undefined {
  const normalized = normalizeCategoryName(value);
  return categoryAliases[normalized];
}

export function getCategoryMeta(value: string): CategoryMeta | undefined {
  const key = getCategoryKey(value);
  return key ? categoriesMap[key] : undefined;
}
