import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-12 w-full min-w-0 rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-base text-gray-800 shadow-none transition-[color,border-color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-gray-400 focus-visible:border-primary focus-visible:ring-0 focus-visible:shadow-[0_0_0_1px_var(--primary)] disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-500 disabled:opacity-100 aria-invalid:border-destructive aria-invalid:shadow-[0_0_0_1px_var(--destructive)]",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
