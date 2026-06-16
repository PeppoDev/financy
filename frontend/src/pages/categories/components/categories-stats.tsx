import { ArrowUpDown, Tag, Utensils } from "lucide-react";

import { Card, CardTitle } from "@/components/ui/card";
import { categories } from "../categories.data";
import { categorySummaries } from "@/pages/dashboard/dashboard.data";

export function CategoriesStats() {
  const totalTransactions = categorySummaries.reduce(
    (acc, item) => acc + item.items,
    0,
  );

  return (
    <section className="grid gap-4 md:grid-cols-3">
      <Card className="bg-white p-6">
        <div className="flex flex-row items-start gap-4">
          <Tag className="size-6 text-gray-700 m-2" />
          <div className="flex flex-col justify-start gap-2">
            <p className="flex items-center gap-2 text-[28px]/[32px]  font-semibold text-gray-800">
              {categories.length}
            </p>
            <CardTitle className="text-xs font-semibold tracking-wide uppercase text-gray-500">
              Total de categorias
            </CardTitle>
          </div>
        </div>
      </Card>

      <Card className="bg-white p-6">
        <div className="flex flex-row items-start gap-4">
          <ArrowUpDown className="m-2 size-6 text-purple-base" />
          <div className="flex flex-col justify-start gap-2">
            <p className="flex items-center gap-2 text-[28px]/[32px] font-semibold text-gray-800">
              {totalTransactions}
            </p>
            <CardTitle className="text-xs font-semibold tracking-wide uppercase text-gray-500">
              Total de transações
            </CardTitle>
          </div>
        </div>
      </Card>

      <Card className="bg-white p-6">
        <div className="flex flex-row items-start gap-4">
          <Utensils className="m-2 size-6 text-blue-base" />
          <div className="flex flex-col justify-start gap-2">
            <p className="flex items-center gap-2 text-[28px]/[32px] font-semibold text-gray-800">
              Alimentação
            </p>
            <CardTitle className="text-xs font-semibold tracking-wide uppercase text-gray-500">
              Categoria mais utilizada
            </CardTitle>
          </div>
        </div>
      </Card>
    </section>
  );
}
