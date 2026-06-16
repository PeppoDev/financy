import { categoriesMap, type CategoryKey } from "@/lib/categories";
import { categorySummaries } from "@/pages/dashboard/dashboard.data";

export const categories = Object.values(categoriesMap);

export function getCategoryItems(categoryKey: CategoryKey) {
  const summary = categorySummaries.find(
    (item) => item.categoryKey === categoryKey,
  );
  return summary?.items ?? 0;
}

export function getCategoryDescription(categoryKey: CategoryKey) {
  const descriptions: Record<CategoryKey, string> = {
    alimentacao: "Restaurantes, delivery e refeicoes",
    entretenimento: "Cinema, jogos e lazer",
    investimento: "Aplicacoes e retornos financeiros",
    mercado: "Compras de supermercado e mantimentos",
    salario: "Renda mensal e bonificacoes",
    saude: "Medicamentos, consultas e exames",
    transporte: "Gasolina, transporte publico e viagens",
    utilidades: "Energia, agua, internet e telefone",
  };

  return descriptions[categoryKey];
}
