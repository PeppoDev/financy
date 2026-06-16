import type { ReactNode } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type MetricCardProps = {
  title: string;
  value: string;
  icon?: ReactNode;
  description?: string;
};

export function MetricCard({
  title,
  value,
  icon,
  description,
}: MetricCardProps) {
  return (
    <Card className="bg-white py-6 gap-4">
      <CardHeader>
        <CardDescription className="flex items-center gap-2 text-xs font-semibold tracking-wide uppercase text-gray-500">
          {icon}
          {title}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-1">
        <CardTitle className="text-3xl font-semibold text-gray-900">
          {value}
        </CardTitle>
        {description ? (
          <p className="text-sm text-gray-500">{description}</p>
        ) : null}
      </CardContent>
    </Card>
  );
}
